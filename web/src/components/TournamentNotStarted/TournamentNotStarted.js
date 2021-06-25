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
    <div className="w-full h-full flex items-center">
      <div className="w-1/4 h-1 bg-black hidden sm:flex" />
      <div className="w-full sm:w-1/2 bg-green-700 rounded-lg mx-4 my-12">
        <h1 className="text-white my-8 text-2xl uppercase text-center">
          Tournament Starting In
        </h1>
        <div className="border-2 border-white p-4 flex mx-8">
          <div className="w-1/4 p-4 flex flex-col justify-center items-center text-xl text-red-900 border-r-2 border-white">
            <p>{timeUntilTourney.days}</p>
            <p>Days</p>
          </div>
          <div className="w-1/4 p-4 flex flex-col justify-center items-center text-xl text-red-900  border-r-2 border-white">
            <p>{timeUntilTourney.hours}</p>
            <p>Hours</p>
          </div>
          <div className="w-1/4 p-4 flex flex-col justify-center items-center text-xl text-red-900  border-r-2 border-white">
            <p>{timeUntilTourney.minutes}</p>
            <p>Minutes</p>
          </div>
          <div className="w-1/4 p-4 flex flex-col justify-center items-center text-xl text-red-900">
            <p>{timeUntilTourney.seconds}</p>
            <p>Seconds</p>
          </div>
        </div>
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
            <div className="text-center text-white my-4">
              Tournaments require a minimum of 2 players
            </div>
          )
        )}
      </div>
      <div className="w-1/4 h-1 bg-black hidden sm:flex" />
    </div>
  )
}

export default TournamentNotStarted
