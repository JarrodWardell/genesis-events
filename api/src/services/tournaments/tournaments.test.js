import {
  tournaments,
  tournament,
  createTournament,
  updateTournament,
  deleteTournament,
} from './tournaments'

describe('tournaments', () => {
  scenario('returns all tournaments', async (scenario) => {
    const result = await tournaments()

    expect(result.length).toEqual(Object.keys(scenario.tournament).length)
  })

  scenario('returns a single tournament', async (scenario) => {
    const result = await tournament({ id: scenario.tournament.one.id })

    expect(result).toEqual(scenario.tournament.one)
  })

  scenario('creates a tournament', async (scenario) => {
    const result = await createTournament({
      input: {
        name: 'String',
        tournamentUrl: 'String2659314',
        startDate: '2021-05-06T22:46:52Z',
        maxPlayers: 4888500,
        locationName: 'String',
        street2: 'String',
        city: 'String',
        country: 'String',
        state: 'String',
        zip: 'String',
        winnerId: 'scenario.tournament.two.winnerId',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.tournamentUrl).toEqual('String2659314')
    expect(result.startDate).toEqual('2021-05-06T22:46:52Z')
    expect(result.maxPlayers).toEqual(4888500)
    expect(result.locationName).toEqual('String')
    expect(result.street2).toEqual('String')
    expect(result.city).toEqual('String')
    expect(result.country).toEqual('String')
    expect(result.state).toEqual('String')
    expect(result.zip).toEqual('String')
    expect(result.winnerId).toEqual('scenario.tournament.two.winnerId')
  })

  scenario('updates a tournament', async (scenario) => {
    const original = await tournament({ id: scenario.tournament.one.id })
    const result = await updateTournament({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a tournament', async (scenario) => {
    const original = await deleteTournament({ id: scenario.tournament.one.id })
    const result = await tournament({ id: original.id })

    expect(result).toEqual(null)
  })
})
