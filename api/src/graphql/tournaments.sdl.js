export const schema = gql`
  type Tournament {
    id: Int!
    name: String!
    desc: String
    tournamentUrl: String!
    distance: Float
    playerCount: Int
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
    active: Boolean
  }

  fragment CoreTournamentFields on Tournament {
    id
    name
    tournamentUrl
    startDate
    dateEnded
    maxPlayers
    players {
      playerId
    }
    store {
      name
      street1
    }
    winners {
      player {
        nickname
      }
    }
    locationName
    lat
    lng
    street1
    street2
    city
    country
    state
    zip
  }

  enum TimerStatus {
    PENDING
    INPROGRESS
    PAUSED
    STOPPED
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
    desc: String
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

  input SearchTournamentInput {
    name: String
    location: String
    lat: Float
    lng: Float
    country: String
    state: String
    city: String
    openSpotsOnly: Boolean!
    dateStart: Date
    dateEnd: Date
    distance: Int
  }

  type Query {
    tournaments: [Tournament!]!
    searchTournaments(input: SearchTournamentInput!): [Tournament!]!
    tournament(id: Int!): Tournament
    tournamentByUrl(url: String): Tournament
    myTournaments: [Tournament!]!
    upcomingTournaments(input: SearchTournamentInput): [Tournament!]!
    finishedTournaments(input: SearchTournamentInput): [Tournament!]!
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
    cancelTournament(id: Int!): Tournament!
  }
`
