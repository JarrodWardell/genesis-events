const TournamentLeaderboardTab = ({ tournament }) => {
  return (
    <div>
      <h2>{'Tournament Leaderboard'}</h2>
      {tournament.players.map((playerScore, index) => (
        <div key={playerScore.player.id}>
          {index + 1}. {playerScore.player.nickname} - WINS: {playerScore.wins}{' '}
          - DRAWS: {playerScore.draws} - BYES: {playerScore.byes} - SCORE:{' '}
          {playerScore.score}
        </div>
      ))}
    </div>
  )
}

export default TournamentLeaderboardTab
