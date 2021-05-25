export const schema = gql`
  type Round {
    id: Int!
    roundNumber: Int!
    matches: [Match]!
    tournament: Tournament!
    timer: Int!
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    tournamentId: Int!
  }

  type Query {
    rounds: [Round!]!
  }

  input CreateRoundInput {
    timer: Int!
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
    tournamentId: Int!
  }

  input UpdateRoundInput {
    timer: Int
    startingTimerInSeconds: Int
    roundTimerLeftInSeconds: Int
    tournamentId: Int
  }
`
