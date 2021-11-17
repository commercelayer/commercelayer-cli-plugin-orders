import { expect, test } from '@oclif/test'

describe('orders:shipping_address_clone_id', () => {
  test
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })

})