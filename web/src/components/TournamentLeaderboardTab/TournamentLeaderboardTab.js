import { useAuth } from '@redwoodjs/auth'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'

const TournamentLeaderboardTab = ({ tournament }) => {
  const { hasRole, currentUser } = useAuth()

  return (
    <div className="w-full overflow-x-auto">
      {tournament.players.length > 0 ? (
        <table className="w-full">
          <tr className="bg-gray-100 w-full text-center text-xs text-gray-500 uppercase leading-4 font-normal">
            <th className="py-2">Rank</th>
            <th className="py-2">Nickname</th>
            <th className="py-2">Wins</th>
            <th className="py-2">Draws</th>
            <th className="py-2">Byes</th>
            <th className="py-2">Losses</th>
            <th className="py-2">Points</th>
            {!tournament.dateEnded &&
              checkTournamentPermissions({
                tournament,
                hasRole,
                currentUser,
              }) && <th className="py-2">User Actions</th>}
          </tr>
          {tournament.players.map((playerScore, index) => (
            <tr
              key={playerScore.player.id}
              className="text-center py-2 border-black border-b-2 text-gray-900 text-sm"
            >
              <td className="text-center py-2">
                {tournament.dateStarted &&
                (playerScore.wins ||
                  playerScore.losses ||
                  playerScore.draws ||
                  playerScore.byes)
                  ? index + 1
                  : '-'}
              </td>
              <td className="flex py-2 justify-center">
                <PlayerProfileItem player={playerScore.player} />
              </td>
              <td className="text-center py-2">{playerScore.wins}</td>
              <td className="text-center py-2">{playerScore.draws}</td>
              <td className="text-center py-2">{playerScore.byes}</td>
              <td className="text-center py-2">{playerScore.losses}</td>
              <td className="text-center py-2">{playerScore.score}</td>
              <td></td>
            </tr>
          ))}
        </table>
      ) : (
        <div className="text-gray-900 text-lg my-8 mx-auto text-center">
          No Players Currently Registered.
        </div>
      )}
    </div>
  )
}

export default TournamentLeaderboardTab
