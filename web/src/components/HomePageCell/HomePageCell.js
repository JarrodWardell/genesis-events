import { useAuth } from '@redwoodjs/auth'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import TournamentItem from '../TournamentItem/TournamentItem'
const CORE_TOURNAMENT_FIELDS = gql`
  fragment CoreTournamentFields on Tournament {
    id
    name
    tournamentUrl
    locationName
    startDate
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

export const Empty = () => <div />

export const Loading = () => (
  <div className="flex w-full h-full justify-center items-center">
    <LoadingIcon size={'24'} />
  </div>
)

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
          <h1 className="text-xl text-black mb-4">Registered Tournaments</h1>
          {myTournaments.map((tournament, index) => (
            <TournamentItem
              tournament={tournament}
              key={tournament.id}
              index={index}
              full={true}
            />
          ))}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-x-24 container mx-auto grid-cols-1">
        <div className="flex flex-col">
          <h1 className="text-xl text-black mb-4">Upcoming Tournaments</h1>
          {upcomingTournaments.map((tournament, index) => (
            <TournamentItem
              tournament={tournament}
              key={tournament.id}
              index={index}
            />
          ))}
        </div>
        <div className="flex flex-col mt-8 sm:mt-0">
          <h1 className="text-xl text-black mb-4">Finished Tournaments</h1>
          {finishedTournaments.map((tournament, index) => (
            <TournamentItem
              tournament={tournament}
              key={tournament.id}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  )
}
