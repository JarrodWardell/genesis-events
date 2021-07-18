export const CORE_TOURNAMENT_FIELDS = gql`
  fragment CoreTournamentFields on Tournament {
    id
    name
    tournamentUrl
    locationName
    startDate
    dateStarted
    dateEnded
    desc
    maxPlayers
    players {
      playerId
    }
    store {
      name
    }
    winners {
      playerId
      player {
        nickname
      }
    }
    lat
    lng
    street1
    street2
    city
    country
    state
    zip
  }
`
