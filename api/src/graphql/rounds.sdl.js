export const schema = gql`
  type Round {
    id: Int!
    roundNumber: Int!
    matches: [Match]!
    tournament: Tournament!
    timer: Int!
    timeStatus: TimerStatus
    timeLeftInSeconds: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    tournamentId: Int!
  }

  enum TimerStatus {
    PENDING
    INPROGRESS
    PAUSED
    STOPPED
  }

  type Query {
    rounds: [Round!]!
  }

  input CreateRoundInput {
    timer: Int!
    timeLeftInSeconds: Int
    tournamentId: Int!
  }

  input UpdateRoundInput {
    timer: Int
    timeLeftInSeconds: Int
    tournamentId: Int
  }
`
