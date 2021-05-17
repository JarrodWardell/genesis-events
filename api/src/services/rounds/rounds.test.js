import { rounds } from './rounds'

describe('rounds', () => {
  scenario('returns all rounds', async (scenario) => {
    const result = await rounds()

    expect(result.length).toEqual(Object.keys(scenario.round).length)
  })
})
