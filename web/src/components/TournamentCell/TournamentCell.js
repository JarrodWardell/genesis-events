import Tournament from 'src/components/Tournament'

export const QUERY = gql`
  query FIND_TOURNAMENT_BY_ID($id: Int!) {
    tournament: tournament(id: $id) {
      id
      name
      tournamentUrl
      startDate
      dateStarted
      dateEnded
      maxPlayers
      timeLeftInSeconds
      locationName
      infoUrl
      street1
      street2
      city
      country
      state
      zip
      lat
      lng
      winnerId
      storeId
      ownerId
      createdAt
      updatedAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Tournament not found</div>

export const Success = ({ tournament }) => {
  return <Tournament tournament={tournament} />
}
