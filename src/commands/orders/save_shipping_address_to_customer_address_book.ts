import Command from '../../base'
import exec from '../../exec'
import { triggers } from '../../triggers'


const TRIGGER = 'save_shipping_address_to_customer_address_book'


export default class OrdersSaveShippingAddressToCustomerAddressBook extends Command {

	static description = triggers[TRIGGER].description

  static flags = {
		...Command.flags,
	}

	static args = [
		...Command.args,
	]


	async run() {

    const { args, flags } = this.parse(OrdersSaveShippingAddressToCustomerAddressBook)

		const res = await exec(args.id, TRIGGER, flags)

    if (flags.print) this.printOutput(res, flags)

    this.successMessage(TRIGGER, res.id)

    return res

	}

}
