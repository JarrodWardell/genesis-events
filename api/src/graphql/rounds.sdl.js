export const schema = gql`
  type Round {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    tournamentId: Int!
    roundNumber: Int!
    active: Boolean!
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
    tournament: Tournament!
    matches: [Match]!
  }

  type Query {
    rounds: [Round!]!
    round(id: Int!): Round
  }

  input CreateRoundInput {
    tournamentId: Int!
    roundNumber: Int!
    active: Boolean!
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
  }

  input UpdateRoundInput {
    tournamentId: Int
    roundNumber: Int
    active: Boolean
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
  }

  type Mutation {
    createRound(input: CreateRoundInput!): Round!
    updateRound(id: Int!, input: UpdateRoundInput!): Round!
    deleteRound(id: Int!): Round!
  }
`
