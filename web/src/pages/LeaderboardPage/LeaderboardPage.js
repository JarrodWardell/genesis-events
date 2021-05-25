import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
const PLAYER_LEADERBOARD = gql`
  query playerLeaderboard($nicknameSearch: String, $skip: Int, $take: Int) {
    playerLeaderboard: playerLeaderboard(
      nicknameSearch: $nicknameSearch
      skip: $skip
      take: $take
    ) {
      id
      player {
        nickname
        country
      }
      rank
      totalScore
      totalPoints
      totalTournamentsPlayed
    }
  }
`

const LeaderboardPage = () => {
  const [nicknameSearch, setNicknameSearch] = React.useState('')
  const [skip, setSkip] = React.useState(0)
  const [take, setTake] = React.useState(10)

  const {
    loading,
    error,
    data: { playerLeaderboard: leaderboard } = {},
  } = useQuery(PLAYER_LEADERBOARD, {
    variables: { nicknameSearch, skip, take },
  })

  return (
    <div>
      <h1>LeaderboardPage</h1>
      <input
        placeholder="Search Nickname"
        onChange={(e) => setNicknameSearch(e.target.value)}
        value={nicknameSearch}
      />
      <table>
        <tr>
          <th>Rank</th>
          <th>Nickname</th>
          <th>Country</th>
          <th>Score</th>
        </tr>
        {!loading &&
          leaderboard &&
          leaderboard.map((player) => (
            <tr key={`leaderboard-player-${player.id}`}>
              <td>{player.rank}</td>
              <td>{player.player?.nickname}</td>
              <td>{player.player?.country}</td>
              <td>{player.totalScore}</td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default LeaderboardPage
