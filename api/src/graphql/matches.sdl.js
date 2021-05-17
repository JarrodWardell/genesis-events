export const schema = gql`
  type Match {
    id: Int!
    players: [PlayerMatchScore]!
    round: Round!
    roundId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    matches: [Match!]!
  }

  input CreateMatchInput {
    roundId: Int!
  }

  input UpdateMatchInput {
    roundId: Int
  }
`
