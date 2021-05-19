export const schema = gql`
  type PlayerTournamentScore {
    id: Int!
    wins: Int!
    byes: Int!
    draws: Int!
    losses: Int!
    score: Float!
    playerId: String!
    player: User!
    tournamentId: Int!
    tournament: Tournament!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    playerTournamentScores: [PlayerTournamentScore!]!
  }

  input CreatePlayerTournamentScoreInput {
    wins: Int!
    draws: Int!
    losses: Int!
    byes: Int!
    score: Float!
    playerId: String!
    tournamentId: Int!
  }

  input UpdatePlayerTournamentScoreInput {
    wins: Int
    draws: Int
    losses: Int
    byes: Int
    score: Float
    playerId: String
    tournamentId: Int
  }
`
