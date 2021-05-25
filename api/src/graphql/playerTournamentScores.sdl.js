export const schema = gql`
  type PlayerTournamentScore {
    id: Int!
    wins: Int!
    byes: Int!
    draws: Int!
    losses: Int!
    score: Float!
    rank: Int
    totalScore: Float
    totalPoints: Float
    totalTournamentsPlayed: Int
    wonTournament: Boolean!
    playerId: String!
    player: User!
    tournamentId: Int!
    tournament: Tournament!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    playerLeaderboard(
      nicknameSearch: String
      skip: Int
      take: Int
    ): [PlayerTournamentScore!]!
  }

  input CreatePlayerTournamentScoreInput {
    wins: Int!
    draws: Int!
    losses: Int!
    byes: Int!
    score: Float!
    wonTournament: Boolean!
    playerId: String!
    tournamentId: Int!
  }

  input UpdatePlayerTournamentScoreInput {
    wins: Int
    draws: Int
    losses: Int
    byes: Int
    score: Float
    wonTournament: Boolean!
    playerId: String
    tournamentId: Int
  }
`
