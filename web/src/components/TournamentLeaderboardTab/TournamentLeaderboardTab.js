const TournamentLeaderboardTab = ({ tournament }) => {
  return (
    <div>
      <h2>{'Tournament Leaderboard'}</h2>
      <table>
        <tr>
          <th>Rank</th>
          <th>Nickname</th>
          <th>Score</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Draws</th>
          <th>Byes</th>
        </tr>
        {tournament.players.map((playerScore, index) => (
          <tr key={playerScore.player.id}>
            <td>{index + 1}</td>
            <td>{playerScore.player.nickname}</td>
            <td>{playerScore.score}</td>
            <td>{playerScore.wins}</td>
            <td>{playerScore.losses}</td>
            <td>{playerScore.draws}</td>
            <td>{playerScore.byes}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default TournamentLeaderboardTab
