import { expect, test } from '@oclif/test'

describe('orders:update_taxes', () => {
  test
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })

})