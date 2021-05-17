import { matches } from './matches'

describe('matches', () => {
  scenario('returns all matches', async (scenario) => {
    const result = await matches()

    expect(result.length).toEqual(Object.keys(scenario.match).length)
  })
})
