import Command from '../../base'
import exec from '../../exec'
import { validActions } from './actions'


const TRIGGER = 'archive'


export default class OrdersArchive extends Command {

	static description = validActions[TRIGGER]

  static flags = {
		...Command.flags,
	}

	static args = [
		...Command.args,
	]


	async run() {
    const { args, flags } = this.parse(OrdersArchive)
		return exec(args.id, TRIGGER, flags)
	}

}
