export const schema = gql`
  type Mutation {
    seedSingleTournament(id: Int!, numPlayers: Int): Tournament @requireAuth
    seedTournaments(country: String, numTournaments: Int): [Tournament]!
      @requireAuth
  }
`
