import { expect, test } from '@oclif/test'

describe('orders:shipping_address_same_as_billing', () => {
  test
    .timeout(31000)
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })
})
