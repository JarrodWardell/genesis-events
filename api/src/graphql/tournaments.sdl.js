export const schema = gql`
  type Tournament {
    id: Int!
    name: String!
    desc: String
    tournamentUrl: String!
    startDate: DateTime!
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int!
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
    locationName: String!
    infoUrl: String
    street1: String
    street2: String
    city: String!
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    round: [Round]
    players: [PlayerTournamentScore]!
    winners: [PlayerTournamentScore]
    store: Store
    storeId: String
    owner: User
    ownerId: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TimerStatus {
    PENDING
    INPROGRESS
    PAUSED
    STOPPED
  }

  type Query {
    tournaments: [Tournament!]!
    tournament(id: Int!): Tournament
    tournamentByUrl(url: String): Tournament
    myTournaments: [Tournament!]!
  }

  input CreateTournamentInput {
    name: String!
    startDate: DateTime!
    maxPlayers: Int!
    locationName: String!
    infoUrl: String
    desc: String
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    storeId: String
  }

  input UpdateTournamentInput {
    name: String
    tournamentUrl: String
    startDate: DateTime
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
    locationName: String
    infoUrl: String
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    storeId: String
    ownerId: String
  }

  input TournamentMatchScoreInput {
    matchId: Int!
    matches: [MatchScore]!
  }

  input MatchScore {
    userId: String!
    playerMatchScore: Int!
    score: Int!
    result: MatchResult!
  }

  enum MatchResult {
    WIN
    TIED
    LOSS
  }

  input TimerInput {
    tournamentId: Int!
    timerLeftInSeconds: Int!
    timerStatus: TimerStatus!
    startingTimerInSeconds: Int!
  }

  type Mutation {
    createTournament(input: CreateTournamentInput!): Tournament!
    updateTournament(id: Int!, input: UpdateTournamentInput!): Tournament!
    deleteTournament(id: Int!): Tournament!
    registerForTournament(id: Int!): String!
    startTournament(id: Int!): Tournament!
    updateTimer(input: TimerInput!): Tournament!
    addMatchScore(input: TournamentMatchScoreInput!): Match!
    advanceRound(
      id: Int!
      roundNumber: Int!
      startingTimerInSeconds: Int
      roundTimerLeftInSeconds: Int
    ): Tournament
    endTournament(id: Int!): Tournament!
  }

  type Subscription {
    tournamentByUrl(url: String): Tournament
  }
`
