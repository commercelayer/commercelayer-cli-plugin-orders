import Command, { Flags } from '../../base'
import exec from '../../exec'
import { triggers } from '../../triggers'


const TRIGGER = 'shipping_address_clone_id'


export default class OrdersShippingAddressCloneId extends Command {

	static description = triggers[TRIGGER].description

  static flags = {
		...Command.flags,
    value: Flags.string({
      char: 'v',
      description: 'the trigger attribute value',
      multiple: false,
      required: true,
    }),
	}

	static args = [
		...Command.args,
	]


	async run() {

    const { args, flags } = await this.parse(OrdersShippingAddressCloneId)

		const res = await exec(args.id, TRIGGER, flags)

    if (flags.print) this.printOutput(res, flags)

    this.successMessage(TRIGGER, res.id)

    return res

	}

}
