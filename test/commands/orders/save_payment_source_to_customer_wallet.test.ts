import { expect, test } from '@oclif/test'

describe('orders:save_payment_source_to_customer_wallet', () => {
  test
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })

})