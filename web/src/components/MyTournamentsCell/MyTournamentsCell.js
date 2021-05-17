import { navigate } from '@redwoodjs/router'

export const QUERY = gql`
  query MY_TOURNAMENTS {
    myTournaments: myTournaments {
      id
      name
      tournamentUrl
      startDate
      maxPlayers
      store {
        name
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
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ myTournaments }) => {
  return (
    <div className="rw-segment">
      {myTournaments.map((tournament) => (
        <div
          className="border-2 border-gray-50 p-5 text-center hover:bg-gray-100 cursor-pointer"
          key={tournament.id}
          onClick={() =>
            navigate(`/tournament/${tournament.tournamentUrl}/rounds`)
          }
        >
          {tournament.name}
        </div>
      ))}
    </div>
  )
}
