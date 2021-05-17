const TournamentLeaderboardTab = ({ tournament }) => {
  return (
    <div>
      <h2>{'Tournament Leaderboard'}</h2>
      {tournament.players.map(({ player }, index) => (
        <div key={player.id}>
          {index + 1}. {player.nickname}
        </div>
      ))}
    </div>
  )
}

export default TournamentLeaderboardTab
