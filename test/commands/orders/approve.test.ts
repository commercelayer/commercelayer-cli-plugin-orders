import { expect, test } from '@oclif/test'

describe('orders:approve', () => {

  test.timeout(3000)

  test
    .stdout()
    .command(['orders:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })

})
