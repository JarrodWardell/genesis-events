import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'
import Button from '../Button/Button'
import { logError } from 'src/helpers/errorLogger'
import AddTournamentPlayer from '../AddTournamentPlayer/AddTournamentPlayer'

export const REMOVE_PLAYER = gql`
  mutation removePlayer($id: Int!) {
    removePlayer: removePlayer(id: $id)
  }
`

const TournamentLeaderboardTab = ({ tournament, setTournament }) => {
  const { hasRole, currentUser } = useAuth()

  const [removePlayer, { loading: loadingRemovePlayer }] = useMutation(
    REMOVE_PLAYER,
    {
      onCompleted: () => {
        toast.success('Successfully Removed Player')
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
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
    <div className="w-full overflow-x-auto h-full pb-96">
      {tournament?.players?.length > 0 ||
      checkTournamentPermissions({
        tournament,
        hasRole,
        currentUser,
      }) ? (
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
          {tournament?.players?.map((playerScore, index) => (
            <tr
              key={
                playerScore.player
                  ? playerScore.player.id
                  : playerScore.playerName
              }
              className="text-center py-2 border-black border-b-2 text-gray-900 text-sm"
            >
              <td className="text-center py-2">
                {playerScore.active
                  ? tournament.dateStarted &&
                    (playerScore.wins ||
                      playerScore.losses ||
                      playerScore.draws ||
                      playerScore.byes)
                    ? index + 1
                    : '-'
                  : 'Inactive'}
              </td>
              <td className=" py-2 ">
                <div className="h-full justify-left items-left flex">
                  <PlayerProfileItem
                    player={playerScore.player || {}}
                    playerName={playerScore.playerName}
                  />
                </div>
              </td>
              <td className="text-center py-2">{playerScore.wins}</td>
              <td className="text-center py-2">{playerScore.draws}</td>
              <td className="text-center py-2">{playerScore.byes}</td>
              <td className="text-center py-2">{playerScore.losses}</td>
              <td className="text-center py-2">{playerScore.score}</td>
              {!tournament.dateEnded &&
                checkTournamentPermissions({
                  tournament,
                  hasRole,
                  currentUser,
                }) && (
                  <td>
                    <div className="flex justify-evenly">
                      {playerScore.active && (
                        <Button
                          color="red"
                          disabled={loadingRemovePlayer}
                          full={false}
                          className="rounded-full w-8 h-8 justify-center items-center"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you would like to remove ${
                                  playerScore.player
                                    ? playerScore.player.nickname
                                    : playerScore.playerName
                                } from this tournament? This cannot be undone`
                              )
                            ) {
                              removePlayer({
                                variables: {
                                  id: playerScore.id,
                                },
                              })
                            }
                          }}
                        >
                          X
                        </Button>
                      )}
                    </div>
                  </td>
                )}
            </tr>
          ))}
          {checkTournamentPermissions({ tournament, hasRole, currentUser }) &&
            !tournament.dateEnded && (
              <AddTournamentPlayer tournament={tournament} />
            )}
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
