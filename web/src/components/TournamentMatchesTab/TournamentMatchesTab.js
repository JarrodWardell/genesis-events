import { navigate } from '@redwoodjs/router'

const TournamentMatchesTab = ({ tournament }) => {
  const matchText = (match) => {
    console.log(match)
    if (match.players[0].score && match.players[1].score) {
      if (match.players[0].score > match.players[1].score) {
        return (
          <span>
            <strong>{match.players[0].user.nickname}</strong> defeated{' '}
            <strong>{match.players[1].user.nickname}</strong>{' '}
            {match.players[0].score} - {match.players[1].score}
          </span>
        )
      } else if (match.players[1].score > match.players[0].score) {
        return (
          <span>
            <strong>{match.players[1].user.nickname}</strong> defeated{' '}
            <strong>{match.players[0].user.nickname}</strong>{' '}
            {match.players[1].score} - {match.players[0].score}
          </span>
        )
      } else if (match.players[1].score === match.players[0].score) {
        return (
          <span>
            <strong>{match.players[0].user.nickname}</strong> drew{' '}
            <strong>{match.players[1].user.nickname}</strong>{' '}
            {match.players[0].score} - {match.players[1].score}
          </span>
        )
      }
    }

    return null
  }

  return (
    <div className="flex flex-col">
      {tournament?.round
        ?.slice(0)
        .reverse()
        .map((round) => (
          <>
            <div key={round.id}>
              {round.matches
                ?.slice(0)
                .sort((a, b) => a.updatedAt - b.updatedAt)
                .map((match) => {
                  const matchResult = matchText(match)
                  if (matchResult) {
                    return (
                      <div
                        key={match.id}
                        className="my-4 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/tournament/${tournament.tournamentUrl}/rounds/${round.roundNumber}#${match.id}`
                          )
                        }
                      >
                        {new Date(match.updatedAt).toString()} - {matchResult}
                      </div>
                    )
                  }
                })}
            </div>
            <div
              className="underline cursor-pointer"
              onClick={() =>
                navigate(
                  `/tournament/${tournament.tournamentUrl}/rounds/${round.roundNumber}`
                )
              }
            >
              {new Date(round.createdAt).toString()} Round {round.roundNumber}{' '}
              Started
            </div>
          </>
        ))}
    </div>
  )
}

export default TournamentMatchesTab
