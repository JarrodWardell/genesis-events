export const standard = defineScenario({
  playerTournamentScore: {
    one: {
      players: {
        create: { nickname: 'String4866325', email: 'String7300677' },
      },

      tournaments: {
        create: {
          name: 'String',
          tournamentUrl: 'String6248172',
          startDate: '2021-05-16T04:16:13Z',
          maxPlayers: 7547844,
          locationName: 'String',
        },
      },
    },

    two: {
      players: {
        create: { nickname: 'String7867489', email: 'String1162549' },
      },

      tournaments: {
        create: {
          name: 'String',
          tournamentUrl: 'String5767190',
          startDate: '2021-05-16T04:16:13Z',
          maxPlayers: 9390055,
          locationName: 'String',
        },
      },
    },
  },
})
