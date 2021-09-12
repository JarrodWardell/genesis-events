export const schema = gql`
  type PlayerTournamentScore {
    id: Int
    wins: Int!
    losses: Int!
    score: Float!
    rank: Int
    totalScore: Float
    totalPoints: Float
    totalTournamentsPlayed: Int
    playerName: String
    playerId: String
    tournamentId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    draws: Int!
    byes: Int!
    active: Boolean!
    wonTournament: Boolean!
    player: User
    tournament: Tournament!
  }

  type PaginatedLeaderboard {
    more: Boolean
    totalCount: Int
    leaderboard: [PlayerTournamentScore!]!
  }

  type Query {
    playerLeaderboard(
      nicknameSearch: String
      skip: Int
      take: Int
    ): PaginatedLeaderboard
    playerTournamentScores: [PlayerTournamentScore!]!
    playerTournamentScore(id: Int!): PlayerTournamentScore
  }

  input CreatePlayerTournamentScoreInput {
    wins: Int!
    losses: Int!
    score: Float!
    playerId: String
    playerName: String
    tournamentId: Int!
    draws: Int!
    byes: Int!
    active: Boolean!
    wonTournament: Boolean!
  }

  input UpdatePlayerTournamentScoreInput {
    wins: Int
    losses: Int
    score: Float
    playerId: String
    playerName: String
    tournamentId: Int
    draws: Int
    byes: Int
    active: Boolean
    wonTournament: Boolean
  }

  type Mutation {
    createPlayerTournamentScore(
      input: CreatePlayerTournamentScoreInput!
    ): PlayerTournamentScore!
    updatePlayerTournamentScore(
      id: Int!
      input: UpdatePlayerTournamentScoreInput!
    ): PlayerTournamentScore!
    deletePlayerTournamentScore(id: Int!): PlayerTournamentScore!
  }
`
