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
    rounds: [Round!]! @requireAuth
    round(id: Int!): Round @requireAuth
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
    createRound(input: CreateRoundInput!): Round! @requireAuth
    updateRound(id: Int!, input: UpdateRoundInput!): Round! @requireAuth
    deleteRound(id: Int!): Round! @requireAuth
  }
`
