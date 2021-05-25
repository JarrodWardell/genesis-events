import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import {
  checkTournamentPermissions,
  timeUntilTournament,
} from 'src/helpers/tournamentHelper'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'

const START_TOURNAMENT_MUTATION = gql`
  mutation startTournament($id: Int!) {
    startTournament(id: $id) {
      id
    }
  }
`

const TournamentNotStarted = ({ tournament }) => {
  const { currentUser, hasRole } = useAuth()
  const [startConfirmation, setStartConfirmation] = React.useState(false)
  const [timeUntilTourney, setTimeUntilTourney] = React.useState(
    timeUntilTournament(tournament.startDate)
  )

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

  React.useEffect(() => {
    let interval = null

    if (tournament && !tournament.dateStarted) {
      setInterval(() => {
        setTimeUntilTourney({ ...timeUntilTournament(tournament.startDate) })
      }, 1000)
    } else if (tournament && interval && tournament.dateStarted) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [tournament])

  const timeToTournament = (tournament) => {
    if (!tournament.dateStarted) {
      return (
        <h1>
          Tournament to begin in {timeUntilTourney.days} days,{' '}
          {timeUntilTourney.hours} hours, {timeUntilTourney.minutes} minutes,{' '}
          {timeUntilTourney.seconds} seconds
        </h1>
      )
    }
  }

  return (
    <div className="text-xl py-4 text-center w-full h-full">
      <h2>{'TournamentRoundsTab'}</h2>
      {timeToTournament(tournament)}
      {checkTournamentPermissions({ hasRole, currentUser, tournament }) &&
      tournament.players.length > 1 ? (
        startConfirmation ? (
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
        )
      ) : (
        tournament.players.length < 2 && (
          <div>Tournaments require a minimum of 2 players</div>
        )
      )}
    </div>
  )
}

export default TournamentNotStarted
