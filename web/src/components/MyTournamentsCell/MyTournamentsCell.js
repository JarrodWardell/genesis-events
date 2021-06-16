export const QUERY = gql`
  query MY_TOURNAMENTS {
    myTournaments: myTournaments {
      id
      name
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

export const Success = ({ tournaments }) => {
  return (
    <div className="rw-segment">
      {tournaments.map((tournament) => (
        <div
          className="border-2 border-gray-50 p-5 text-center"
          key={tournament.id}
        >
          {tournament.name}
        </div>
      ))}
    </div>
  )
}
