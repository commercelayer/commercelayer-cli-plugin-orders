import { expect, test } from '@oclif/test'

describe('orders:stop_editing', () => {
  test
    .timeout(5000)
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })
})