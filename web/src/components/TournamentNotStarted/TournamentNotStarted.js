import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'

const START_TOURNAMENT_MUTATION = gql`
  mutation startTournament($id: Int!) {
    startTournament(id: $id) {
      id
    }
  }
`

const TournamentNotStarted = ({ tournament }) => {
  const { currentUser } = useAuth()
  const [startConfirmation, setStartConfirmation] = React.useState(false)

  const [startTournament, { loading, error }] = useMutation(
    START_TOURNAMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tournament started!')
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament.tournamentUrl },
        },
      ],
    }
  )

  return (
    <div>
      <h2>{'TournamentRoundsTab'}</h2>
      <p>Tournament will begin in</p>
      {tournament.ownerId === currentUser?.user?.id &&
        (startConfirmation ? (
          <button
            className="py-4 px-8 text-center border-red-700 border-2 cursor-pointer hover:bg-green-600"
            onClick={() =>
              startTournament({ variables: { id: tournament.id } })
            }
            disabled={loading}
          >
            Click here to Confirm Start Tournament
          </button>
        ) : (
          <button
            className="py-4 px-8 text-center border-green-700 border-2 cursor-pointer hover:bg-green-600"
            onClick={() => setStartConfirmation(true)}
          >
            Start Tournament
          </button>
        ))}
    </div>
  )
}

export default TournamentNotStarted
