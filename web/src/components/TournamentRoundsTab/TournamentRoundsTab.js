import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { calcNumRounds } from 'src/helpers/tournamentHelper'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import MatchDetails from '../MatchDetails/MatchDetails'
import TournamentNotStarted from '../TournamentNotStarted/TournamentNotStarted'

const TournamentRoundsTab = ({ tournament }) => {
  const [selectedRound, setSelectedRound] = React.useState(1)

  React.useEffect(() => {
    if (
      tournament.dateStarted &&
      tournament.round.length > 0 &&
      tournament.round.length !== selectedRound
    ) {
      setSelectedRound(
        tournament.round[tournament.round.length - 1].roundNumber
      )
    }
  }, [tournament])

  if (!tournament.dateStarted) {
    return <TournamentNotStarted tournament={tournament} />
  }

  const grabRound = () => {
    let round = {}

    tournament.round.map((rnd) => {
      if (rnd.roundNumber === selectedRound) {
        round = { ...rnd }
      }
    })

    return round
  }

  const renderRound = () => {
    let round = grabRound()
    let matches = []

    round.matches.map((match, index) => {
      matches.push(
        <MatchDetails match={match} index={index} tournament={tournament} />
      )
    })

    return matches
  }

  const checkScoresSubmitted = () => {
    let round = grabRound()
    let scoresSubmitted = true

    round.matches.forEach((match) => {
      match.players.forEach((player) => {
        if (!player.score && !player.bye) {
          scoresSubmitted = false
        }
      })
    })

    return scoresSubmitted
  }

  return (
    <div className="w-full">
      <h2>{'Rounds'}</h2>
      <div className="flex w-full my-4">
        {tournament.round?.map((round) => {
          return (
            <div
              key={round.id}
              onClick={() => setSelectedRound(round.roundNumber)}
              className={
                'py-4 px-8 w-20 border-gray-100 border-2 cursor-pointer hover:bg-blue-500' +
                (round.roundNumber === selectedRound ? ' bg-blue-300' : '')
              }
            >
              {round.roundNumber}
            </div>
          )
        })}
      </div>
      <div className="w-full flex flex-col">{renderRound()}</div>
      {calcNumRounds(tournament.players.length) > grabRound().roundNumber &&
      tournament.round.length === grabRound().roundNumber ? (
        <button
          disabled={!checkScoresSubmitted()}
          onClick={() => {
            console.log('HELLO THERE')
          }}
        >
          Advance to next round
        </button>
      ) : (
        <button>End Tournament</button>
      )}
    </div>
  )
}

export default TournamentRoundsTab
