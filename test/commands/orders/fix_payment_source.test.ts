import { expect, test } from '@oclif/test'

describe('orders:fix_payment_source', () => {
  test
    .timeout(33000)
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })
})
