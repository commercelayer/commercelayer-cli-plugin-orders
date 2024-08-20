import { expect } from 'chai'
import { runCommand } from '@oclif/test'


describe('orders:pending', () => {
  it('runs NoC', async () => {
    const { stdout } = await runCommand<{ name: string }>(['orders:noc'])
    expect(stdout).to.contain('-= NoC =-')
  }).timeout(30000)
})

