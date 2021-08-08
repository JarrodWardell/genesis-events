export const schema = gql`
  type Mutation {
    seedSingleTournament(id: Int!, numPlayers: Int): Tournament
    seedTournaments(country: String, numTournaments: Int): [Tournament]!
  }
`
