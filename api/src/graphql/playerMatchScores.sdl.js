export const schema = gql`
  type PlayerMatchScore {
    id: Int!
    score: Int
    userId: String
    playerName: String
    matchId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    wonMatch: Boolean!
    bye: Boolean!
    active: Boolean!
    match: Match!
    user: User
  }

  type Query {
    playerMatchScores: [PlayerMatchScore!]! @requireAuth
    playerMatchScore(id: Int!): PlayerMatchScore @requireAuth
  }

  input CreatePlayerMatchScoreInput {
    score: Int
    userId: String
    playerName: String
    matchId: Int!
    wonMatch: Boolean!
    bye: Boolean!
    active: Boolean!
  }

  input UpdatePlayerMatchScoreInput {
    score: Int
    userId: String
    playerName: String
    matchId: Int
    wonMatch: Boolean
    bye: Boolean
    active: Boolean
  }

  type Mutation {
    createPlayerMatchScore(
      input: CreatePlayerMatchScoreInput!
    ): PlayerMatchScore! @requireAuth
    updatePlayerMatchScore(
      id: Int!
      input: UpdatePlayerMatchScoreInput!
    ): PlayerMatchScore! @requireAuth
    deletePlayerMatchScore(id: Int!): PlayerMatchScore! @requireAuth
  }
`
