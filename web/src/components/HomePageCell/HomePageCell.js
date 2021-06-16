import { useAuth } from '@redwoodjs/auth'
import TournamentItem from '../TournamentItem/TournamentItem'
const CORE_TOURNAMENT_FIELDS = gql`
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
export const QUERY = gql`
  ${CORE_TOURNAMENT_FIELDS}
  query HomePageQuery {
    myTournaments {
      ...CoreTournamentFields
    }
    upcomingTournaments {
      ...CoreTournamentFields
    }
    finishedTournaments {
      ...CoreTournamentFields
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({
  myTournaments,
  upcomingTournaments,
  finishedTournaments,
}) => {
  const { currentUser } = useAuth()

  return (
    <>
      {currentUser && (
        <div className="my-8">
          <h1>Registered Tournaments</h1>
          {myTournaments.map((tournament) => (
            <TournamentItem tournament={tournament} key={tournament.id} />
          ))}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-x-8 container mx-auto sm:grid-cols-1">
        <div className="flex flex-col">
          <h1>Upcoming Tournaments</h1>
          {upcomingTournaments.map((tournament) => (
            <TournamentItem tournament={tournament} key={tournament.id} />
          ))}
        </div>
        <div className="flex flex-col">
          <h1>Finished Tournaments</h1>
          {finishedTournaments.map((tournament) => (
            <TournamentItem tournament={tournament} key={tournament.id} />
          ))}
        </div>
      </div>
    </>
  )
}
