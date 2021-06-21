export const schema = gql`
  type PlayerMatchScore {
    id: Int!
    score: Int
    userId: String!
    matchId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    wonMatch: Boolean!
    bye: Boolean!
    active: Boolean!
    match: Match!
    user: User!
  }

  type Query {
    playerMatchScores: [PlayerMatchScore!]!
    playerMatchScore(id: Int!): PlayerMatchScore
  }

  input CreatePlayerMatchScoreInput {
    score: Int
    userId: String!
    matchId: Int!
    wonMatch: Boolean!
    bye: Boolean!
    active: Boolean!
  }

  input UpdatePlayerMatchScoreInput {
    score: Int
    userId: String
    matchId: Int
    wonMatch: Boolean
    bye: Boolean
    active: Boolean
  }

  type Mutation {
    createPlayerMatchScore(
      input: CreatePlayerMatchScoreInput!
    ): PlayerMatchScore!
    updatePlayerMatchScore(
      id: Int!
      input: UpdatePlayerMatchScoreInput!
    ): PlayerMatchScore!
    deletePlayerMatchScore(id: Int!): PlayerMatchScore!
  }
`
