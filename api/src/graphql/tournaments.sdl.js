export const schema = gql`
  type Tournament {
    id: Int!
    name: String!
    desc: String
    type: String
    tournamentUrl: String!
    distance: Float
    playerCount: Int
    startDate: DateTime!
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int!
    locationName: String!
    publicRegistration: Boolean
    infoUrl: String
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    lat: Float
    lng: Float
    userId: String
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
    storeId: String
    ownerId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    owner: User
    store: Store
    user: User
    matches: [Match]!
    players: [PlayerTournamentScore]!
    winners: [PlayerTournamentScore]
    round: [Round]!
    active: Boolean!
  }

  fragment CoreTournamentFields on Tournament {
    id
    name
    tournamentUrl
    type
    startDate
    dateStarted
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
      playerName
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

  type Query {
    tournaments(searchTerm: String): [Tournament!]!
    searchTournaments(input: SearchTournamentInput!): PaginatedTournaments!
    tournament(id: Int!): Tournament
    tournamentByUrl(url: String): Tournament
    myTournaments: [Tournament!]!
    currentTournaments(input: SearchTournamentInput): [Tournament!]!
    upcomingTournaments(input: SearchTournamentInput): [Tournament!]!
    finishedTournaments(input: SearchTournamentInput): [Tournament!]!
    searchNonPlayers(id: Int!, searchTerm: String): [User!]!
  }

  input CreateTournamentInput {
    name: String!
    tournamentUrl: String
    startDate: DateTime!
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int!
    locationName: String!
    publicRegistration: Boolean
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
    userId: String
    desc: String
    type: String
    active: Boolean
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
  }

  input UpdateTournamentInput {
    name: String
    tournamentUrl: String
    startDate: DateTime
    dateStarted: DateTime
    dateEnded: DateTime
    maxPlayers: Int
    publicRegistration: Boolean
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
    userId: String
    desc: String
    type: String
    active: Boolean
    startingTimerInSeconds: Int
    timerLeftInSeconds: Int
    timerStatus: TimerStatus
    timerLastUpdated: DateTime
  }

  input TournamentMatchScoreInput {
    matchId: Int!
    matches: [MatchScore]!
  }

  input MatchScore {
    userId: String
    playerName: String
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
    take: Int
    skip: Int
    name: String
    location: String
    lat: Float
    lng: Float
    country: String
    state: String
    city: String
    openSpotsOnly: Boolean
    finishedTournaments: Boolean
    dateStart: Date
    dateEnd: Date
    distance: Int
  }

  type PaginatedTournaments {
    more: Boolean
    totalCount: Int
    tournaments: [Tournament!]!
  }

  input AddPlayerInput {
    playerName: String!
    playerId: String
    wins: Int
    losses: Int
    byes: Int
    draws: Int
    score: Float
  }

  type Mutation {
    createTournament(input: CreateTournamentInput!): Tournament!
    updateTournament(id: Int!, input: UpdateTournamentInput!): Tournament!
    addPlayer(id: Int!, input: AddPlayerInput!): Tournament!
    deleteTournament(id: Int!): Tournament!
    registerForTournament(id: Int!): String!
    startTournament(id: Int!): Tournament!
    updateTimer(input: TimerInput!): Tournament!
    addMatchScore(input: TournamentMatchScoreInput!): Match!
    updateMatchScore(input: TournamentMatchScoreInput!): Match!
    advanceRound(id: Int!, roundNumber: Int!): Tournament
    endTournament(id: Int!): Tournament!
    cancelTournament(id: Int!): Tournament!
    leaveTournament(id: Int!): String!
    removePlayer(id: Int!): String!
  }
`
