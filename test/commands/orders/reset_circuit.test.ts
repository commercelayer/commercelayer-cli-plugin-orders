import { expect, test } from '@oclif/test'

describe('orders:reset_circuit', () => {
  test
    .timeout(33000)
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })
})
