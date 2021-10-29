export const schema = gql`
  type Match {
    id: Int!
    roundId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    tournamentId: Int!
    active: Boolean!
    round: Round!
    tournament: Tournament!
    players: [PlayerMatchScore]!
  }

  type Query {
    matches: [Match!]! @requireAuth
    match(id: Int!): Match @requireAuth
  }

  input CreateMatchInput {
    roundId: Int!
    tournamentId: Int!
    active: Boolean!
  }

  input UpdateMatchInput {
    roundId: Int
    tournamentId: Int
    active: Boolean
  }

  type Mutation {
    createMatch(input: CreateMatchInput!): Match! @requireAuth
    updateMatch(id: Int!, input: UpdateMatchInput!): Match! @requireAuth
    deleteMatch(id: Int!): Match! @requireAuth
  }
`
