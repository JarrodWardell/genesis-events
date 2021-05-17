export const schema = gql`
  type PlayerMatchScore {
    id: Int!
    score: Int
    bye: Boolean
    wonMatch: Boolean
    user: User
    userId: String
    match: Match
    matchId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    playerMatchScores: [PlayerMatchScore!]!
  }

  input CreatePlayerMatchScoreInput {
    score: Int
    userId: String
    matchId: Int
  }

  input UpdatePlayerMatchScoreInput {
    score: Int
    userId: String
    matchId: Int
  }
`
