import { expect, test } from '@oclif/test'

describe('orders:capture', () => {
  test
    .timeout(10000)
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })
})
