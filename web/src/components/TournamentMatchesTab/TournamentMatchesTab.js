import { navigate } from '@redwoodjs/router'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'

const TournamentMatchesTab = ({ tournament }) => {
  const matchText = (match) => {
    let player1 = match.players[0].user
    let player2 = match.players.length > 1 ? match.players[1].user : null

    if (
      (match.players[0].score || match.players[0].score === 0) &&
      (match.players[1].score || match.players[1].score === 0)
    ) {
      if (match.players[0].score > match.players[1].score) {
        return (
          <>
            <span className="w-36 sm:w-1/6">
              <PlayerProfileItem
                player={player1 || {}}
                playerName={match.players[0].playerName}
              />
            </span>{' '}
            <span className="w-24 sm:w-1/6">defeated </span>
            <span className="w-36 sm:w-1/6">
              <PlayerProfileItem
                player={player2 || {}}
                playerName={match?.players[1]?.playerName}
              />
            </span>{' '}
          </>
        )
      } else if (match.players[1].score > match.players[0].score) {
        return (
          <>
            <span className="w-36 sm:w-1/6">
              <PlayerProfileItem
                player={player2 || {}}
                playerName={match?.players[1]?.playerName}
              />
            </span>{' '}
            <span className="w-24 sm:w-1/6">defeated</span>
            <span className="w-36 sm:w-1/6">
              <PlayerProfileItem
                player={player1 || {}}
                playerName={match.players[0].playerName}
              />
            </span>{' '}
          </>
        )
      } else if (match.players[1].score === match.players[0].score) {
        return (
          <>
            <span className="w-36 sm:w-1/6">
              <PlayerProfileItem
                player={player1 || {}}
                playerName={match.players[0].playerName}
              />
            </span>
            <span className="w-24 sm:w-1/6">drew</span>
            <span className="w-36 sm:w-1/6">
              <PlayerProfileItem
                player={player2 || {}}
                playerName={match?.players[1]?.playerName}
              />
            </span>{' '}
          </>
        )
      }
    } else if (!player2) {
      return (
        <>
          <span className="w-36 sm:w-1/6">
            <PlayerProfileItem
              player={player1 || {}}
              playerName={match?.players[1]?.playerName}
            />
          </span>{' '}
          <span className="w-24 sm:w-1/6">bye</span>
        </>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col text-sm text-gray-900 max-w-3xl overflow-x-auto sm:w-full sm:max-w-none">
      {tournament.round?.length > 0 ? (
        tournament?.round
          ?.slice(0)
          .reverse()
          .map((round) => (
            <>
              <>
                {round.matches
                  ?.slice(0)
                  .sort((a, b) => a.updatedAt - b.updatedAt)
                  .map((match) => {
                    const matchResult = matchText(match)
                    if (matchResult) {
                      return (
                        <div
                          key={match.id}
                          className="flex w-max sm:w-full py-4 sm:px-4 border-b border-black cursor-pointer items-center hover:bg-gray-100"
                          onClick={() =>
                            navigate(
                              `/tournament/${tournament.tournamentUrl}/rounds/${round.roundNumber}#${match.id}`
                            )
                          }
                        >
                          <span className="w-24 sm:w-1/6">
                            Round {round.roundNumber}
                          </span>
                          {matchResult}
                        </div>
                      )
                    }
                  })}
              </>
              <div
                className="flex w-full sm:w-full py-4 sm:px-4 border-b border-black cursor-pointer font-bold hover:bg-gray-100 "
                onClick={() =>
                  navigate(
                    `/tournament/${tournament.tournamentUrl}/rounds/${round.roundNumber}`
                  )
                }
                key={round.id}
              >
                <span className="w-24 sm:w-1/6">Round {round.roundNumber}</span>
                <span className="w-24 sm:w-1/6"> Started</span>
              </div>
            </>
          ))
      ) : (
        <div className="text-gray-900 text-lg my-8 mx-auto text-center w-screen sm:w-full">
          No completed matches.
        </div>
      )}
    </div>
  )
}

export default TournamentMatchesTab
