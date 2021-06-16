import { Link, routes } from '@redwoodjs/router'

const TournamentItem = ({ tournament }) => {
  return (
    <Link
      to={routes.viewTournament({
        url: tournament?.tournamentUrl,
        tab: 'rounds',
        tabOptions: 1,
      })}
      className="border-2 border-gray-50 p-5 text-center hover:bg-gray-100 cursor-pointer flex flex-col w-full"
    >
      <div className="font-bold">{tournament.name}</div>
      <div className="bold">
        Players: {tournament?.players?.length} / {tournament?.maxPlayers}
      </div>
      {tournament.dateEnded && (
        <div className="bold">Date Ended: {tournament.dateEnded}</div>
      )}
      {!tournament.dateEnded && (
        <div className="bold">Date To Start: {tournament.startDate}</div>
      )}
      {tournament.city && (
        <div className="bold">
          {tournament.city}, {tournament.state}, {tournament.country}
        </div>
      )}
      {tournament.winners.length > 0 && (
        <div>
          <span className="font-bold">Winners: </span>
          {tournament.winners.map((winner, index) => (
            <span key={`winner-${winner.playerId}`}>
              {index > 0 && <span>, </span>}
              {winner.player.nickname}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

export default TournamentItem
