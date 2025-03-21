/* eslint-disable no-console, no-eval */
import fs from 'fs'
import { join } from 'path'
import snakeCase from 'lodash.snakecase'
import { clSchema } from '@commercelayer/cli-core'

const Inflector = require('inflector-js')


const COMMANDS_DIR = 'src/commands/orders'
const TEMPLATES_DIR = 'gen/templates'
const SPECS_DIR = 'test/commands/orders'


const clean = () => {

  const staticFiles = ['index.ts', 'noc.ts', 'history.ts']

  // Clean commands dir
  const files = fs.readdirSync(COMMANDS_DIR)
  files.forEach(f => {
    if (!staticFiles.includes(f)) fs.unlinkSync(`${COMMANDS_DIR}/${f}`)
  })
  console.log('Deleted command files')

  // Clean specs dir
  const specs = fs.readdirSync(SPECS_DIR)
  specs.forEach(f => {
    if (!['index.test.ts', 'noc.test.ts'].includes(f)) fs.unlinkSync(`${SPECS_DIR}/${f}`)
  })
  console.log('Deleted spec files')

}


const readTemplate = (template: string): string => {
  let tpl = template
  if (!tpl.endsWith('.tpl')) tpl += '.tpl'
  return fs.readFileSync(join(TEMPLATES_DIR, tpl), { encoding: 'utf-8' })
}


const getOrderActions = async (): Promise<any[]> => {

  console.log('Downloading OpenAPI schema ...')

  const schema = await clSchema.download()

  console.log('Downloaded OpenAPI schema v' + schema.info.version)

  const triggers: any[] = []

  Object.entries(schema.components.schemas.orderUpdate.properties.data.properties.attributes.properties).forEach(([k, a]) => {
    if (k.startsWith('_')) triggers.push({ action: k.substring(1), trigger: k, description: (a as any).description })
  })

  return triggers

}


const updateTriggers = async (): Promise<any> => {

  const actions = await getOrderActions()

  const triggersTpl = readTemplate('triggers')

  const actionsObject = actions.map(r => {
    return `${r.action}: {
    action: '${r.action}',
    trigger: '${r.trigger}',
    description: '${r.description.replace(/'/g, '\\\'')}',
  },`
  }).join('\n\t')

  let triggers = triggersTpl.replace(/##__TRIGGERS__##/, actionsObject)

  triggers = triggers.replace(/##__ACTION__##/, Object.values(actions).map(v => `'${v.action}'`).join(' |\n\t'))

  fs.writeFileSync('src/triggers.ts', triggers)

  return eval(`({${actionsObject}})`)

}



const FLAG_VALUE_STR = `value: Flags.string({
      char: 'v',
      description: 'the trigger attribute value',
      multiple: false,
      required: true,
    }),`


const generate = async () => {

  console.log('Updating trigger list ...')
  const triggers = await updateTriggers()
  console.log('Trigger list updated')

  console.log('Cleaning folders ...')
  clean()

  const actionTpl = readTemplate('action')
  const specTpl = readTemplate('spec')


  const specTimeout = 1000 * Object.keys(triggers).length

  Object.keys(triggers).forEach(action => {

    let command = actionTpl.replace(/##__ACTION_ID__##/g, action)
    const name = Inflector.camelize(action)
    command = command.replace(/##__ACTION_NAME__##/g, name)

    const flagValue = action.endsWith('_id') ? FLAG_VALUE_STR : ''
    command = command.replace(/##__FLAG_VALUE__##/, flagValue)
    const flagsImport = action.endsWith('_id') ? ', { Flags }' : ''
    command = command.replace(/##__FLAGS_IMPORT__##/, flagsImport)

    const fileName = snakeCase(action) + '.ts'
    fs.writeFileSync(join(COMMANDS_DIR, fileName), command)
    console.log(`Created command: ${action} [${fileName}]`)

    let spec = specTpl.replace(/##__ACTION_ID__##/g, action)
    spec = spec.replace(/##__SPEC_TIMEOUT__##/g, String(specTimeout))
    const specName = fileName.replace(/.ts/g, '.test.ts')
    fs.writeFileSync(join(SPECS_DIR, specName), spec)
    console.log(`Created spec: ${action} [${specName}]`)

  })

  /*
  Manifest.run().then(() => console.log('Generated commands manifest'))
    .then(() => console.log('Order commands generation completed.'))
    */

}


generate()
