import { playerTournamentScores } from './playerTournamentScores'

describe('playerTournamentScores', () => {
  scenario('returns all playerTournamentScores', async (scenario) => {
    const result = await playerTournamentScores()

    expect(result.length).toEqual(
      Object.keys(scenario.playerTournamentScore).length
    )
  })
})
