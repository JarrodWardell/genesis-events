import { playerMatchScores } from './playerMatchScores'

describe('playerMatchScores', () => {
  scenario('returns all playerMatchScores', async (scenario) => {
    const result = await playerMatchScores()

    expect(result.length).toEqual(Object.keys(scenario.playerMatchScore).length)
  })
})
