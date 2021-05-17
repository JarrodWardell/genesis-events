import { Link, routes } from '@redwoodjs/router'

import Tournaments from 'src/components/Tournaments'

export const QUERY = gql`
  query TOURNAMENTS {
    tournaments {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tournaments yet. '}
      <Link to={routes.newTournament()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ tournaments }) => {
  return <Tournaments tournaments={tournaments} />
}
