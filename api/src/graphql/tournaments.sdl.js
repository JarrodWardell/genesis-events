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
    timeLeftInSeconds: Int
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
    winner: User
    winnerId: String!
    store: Store
    storeId: String
    owner: User
    ownerId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    User: User
    userId: String
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
    timeLeftInSeconds: Int
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
    winnerId: String
    storeId: String
    ownerId: String
    userId: String
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

  type Mutation {
    createTournament(input: CreateTournamentInput!): Tournament!
    updateTournament(id: Int!, input: UpdateTournamentInput!): Tournament!
    deleteTournament(id: Int!): Tournament!
    registerForTournament(id: Int!): String!
    startTournament(id: Int!): Tournament!
    addMatchScore(input: TournamentMatchScoreInput!): Match!
    advanceRound(id: Int!, roundNumber: Int!): Tournament
  }

  type Subscription {
    tournamentByUrl(url: String): Tournament
  }
`
