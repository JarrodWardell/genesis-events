import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import TournamentNotStarted from '../TournamentNotStarted/TournamentNotStarted'

const TournamentRoundsTab = ({ tournament }) => {
  const { currentUser } = useAuth()
  const [selectedRound, setSelectedRound] = React.useState(1)

  if (!tournament.dateStarted) {
    return <TournamentNotStarted tournament={tournament} />
  }

  const renderRound = () => {
    let round = {}
    let matches = []
    tournament.round.map((rnd) => {
      if (rnd.roundNumber === selectedRound) {
        round = { ...rnd }
      }
    })

    round.matches.map((match, index) => {
      matches.push(
        <div className="flex w-full">
          <div>{index + 1}.</div>
          <div className="flex flex-col w-1/3">
            <div>{match.players[0].user?.nickname}</div>
            <div>
              {match.players[0].score ? match.players[0].score : <input />}
            </div>
          </div>
          <div className="w-1/3">vs</div>

          <div className="flex flex-col w-1/3">
            <div>{match.players[1].user?.nickname}</div>
            <div>
              {match.players[1].score ? match.players[1].score : <input />}
            </div>
          </div>
        </div>
      )
    })

    return matches
  }

  return (
    <div className="w-full">
      <h2>{'Rounds'}</h2>
      <div className="flex w-full my-4">
        {tournament.round?.map((round) => {
          return (
            <div
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
    </div>
  )
}

export default TournamentRoundsTab
