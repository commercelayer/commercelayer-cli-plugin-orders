import Command from '../../base'
import exec from '../../exec'
import { triggers } from '../../triggers'


const TRIGGER = 'cancel'


export default class OrdersCancel extends Command {

	static description = triggers[TRIGGER].description

  static flags = {
		...Command.flags,
	}

	static args = [
		...Command.args,
	]


	async run() {

    const { args, flags } = this.parse(OrdersCancel)

		const res = await exec(args.id, TRIGGER, flags)

    if (flags.print) this.printOutput(res, flags)

    this.successMessage(TRIGGER, res.id)

    return res

	}

}
