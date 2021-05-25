import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import InputMask from 'react-input-mask'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'

export const UPDATE_TIMER = gql`
  mutation updateTimer($input: TimerInput!) {
    updateTimer: updateTimer(input: $input) {
      timerLeftInSeconds
      timerStatus
      startingTimerInSeconds
      timerLastUpdated
    }
  }
`

const TournamentTimer = ({
  tournament,
  startingTimerInSeconds,
  setStartingTimerInSeconds,
  timerInSeconds,
  setTimerSeconds,
}) => {
  const [timerInput, setTimerInput] = React.useState('060:00')
  const [timerStatus, setTimerStatus] = React.useState('PENDING')
  const { currentUser, hasRole } = useAuth()
  const [updateTimer, { loading, error }] = useMutation(UPDATE_TIMER, {
    refetchQueries: [
      {
        query: TOURNAMENT_BY_URL,
        variables: { url: tournament.tournamentUrl },
      },
    ],
  })

  React.useEffect(() => {
    if (
      timerInSeconds !== tournament.timerLeftInSeconds ||
      timerStatus !== tournament.timerStatus ||
      startingTimerInSeconds !== tournament.startingTimerInSeconds
    ) {
      let timeElapsed = 0

      if (tournament.startingTimerInSeconds === 'INPROGRESS') {
        timeElapsed = Math.floor(
          (new Date() - new Date(tournament.timerLastUpdated)) / 1000
        )
      }

      setTimerSeconds(tournament.timerLeftInSeconds - timeElapsed)
      setTimerStatus(tournament.timerStatus)
      setStartingTimerInSeconds(tournament.startingTimerInSeconds)
    }
  }, [tournament])

  React.useEffect(() => {
    let timerInterval = null

    if (timerStatus === 'INPROGRESS' && timerInterval === null) {
      timerInterval = setInterval(() => {
        setTimerSeconds((timerInSeconds) => timerInSeconds - 1)
      }, 1000)
    } else if (
      (timerStatus === 'PAUSED' || timerStatus === 'STOPPED') &&
      timerInterval
    ) {
      clearInterval(timerInterval)
    }

    return () => clearInterval(timerInterval)
  }, [timerStatus, timerInSeconds])

  const startTimer = (timerValue) => {
    const timerSplit = timerValue.split(':')
    const seconds = parseInt(timerSplit[1]) + parseInt(timerSplit[0]) * 60
    let localStartingTimerInSeconds = startingTimerInSeconds
    if (timerValue === timerInput) {
      localStartingTimerInSeconds = seconds
      setStartingTimerInSeconds(seconds)
    }

    setTimerSeconds(seconds)
    setTimerStatus('INPROGRESS')
    updateTimer({
      variables: {
        input: {
          tournamentId: tournament.id,
          startingTimerInSeconds: localStartingTimerInSeconds,
          timerLeftInSeconds: seconds,
          timerStatus: 'INPROGRESS',
        },
      },
    })
  }

  const pauseTimer = () => {
    setTimerStatus('PAUSED')
    updateTimer({
      variables: {
        input: {
          tournamentId: tournament.id,
          startingTimerInSeconds,
          timerLeftInSeconds: timerInSeconds,
          timerStatus: 'PAUSED',
        },
      },
    })
  }

  const endTimer = () => {
    setTimerStatus('STOPPED')
    updateTimer({
      variables: {
        input: {
          tournamentId: tournament.id,
          startingTimerInSeconds,
          timerLeftInSeconds: timerInSeconds,
          timerStatus: 'STOPPED',
        },
      },
    })
  }

  const formatTime = (timerInSeconds) => {
    let minutes = Math.floor(timerInSeconds / 60)
    let seconds = timerInSeconds - minutes * 60

    if (seconds < 10) {
      seconds = '0' + seconds
    }

    return `${minutes}:${seconds}`
  }

  const renderButtons = () => {
    if (checkTournamentPermissions({ hasRole, currentUser, tournament })) {
      if (timerInSeconds) {
        return (
          <>
            {timerStatus === 'INPROGRESS' ? (
              <button
                className="rounded-md bg-yellow-300 cursor-pointer hover:bg-yellow-400 px-4 my-2"
                onClick={pauseTimer}
                disabled={loading}
              >
                Pause Timer
              </button>
            ) : (
              <button
                className="rounded-md bg-yellow-300 cursor-pointer hover:bg-yellow-400 px-4 my-2"
                onClick={() => startTimer(formatTime(timerInSeconds))}
                disabled={loading}
              >
                Continue Timer
              </button>
            )}

            <button
              className="rounded-md bg-red-300 cursor-pointer hover:bg-red-400 px-4 my-2"
              onClick={endTimer}
              disabled={loading}
            >
              End Timer
            </button>
          </>
        )
      } else {
        return (
          <button
            className="rounded-md bg-green-300 cursor-pointer hover:bg-green-400 px-4 my-2"
            onClick={() => startTimer(timerInput)}
          >
            Start Timer
          </button>
        )
      }
    }

    return null
  }

  return (
    <>
      {timerInSeconds ? (
        <div className="flex flex-col">
          <div className="center-text">{formatTime(timerInSeconds)}</div>
          <div className="w-full rounded-2xl border-2 border-black-900">
            <div
              className="bg-red-500 h-4 rounded-l-2xl"
              style={{
                width: `${
                  100 - (timerInSeconds / startingTimerInSeconds) * 100
                }%`,
              }}
            />
          </div>
          {renderButtons()}
        </div>
      ) : (
        <div className="flex flex-col">
          <InputMask
            className="border-black-500 border-2 text-xl w-full px-4 rounded-l"
            mask={'?99:99'}
            formatChars={{ 9: '[0-9]', t: '[0-9-]', '?': '[0-9 ]' }}
            maskChar={null}
            value={timerInput}
            onChange={(e) => setTimerInput(e.target.value)}
          />
          {renderButtons()}
        </div>
      )}
    </>
  )
}

export default TournamentTimer
