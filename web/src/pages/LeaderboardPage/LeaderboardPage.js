import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import PlayerProfileItem from 'src/components/PlayerProfileItem/PlayerProfileItem'

import { ReactComponent as SearchIcon } from 'src/components/Icons/SearchIcon.svg'

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
        photo {
          url
          name
        }
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
    <div className="flex flex-col container max-w-7xl mx-auto px-2">
      <h1 className="text-xl mt-8 sm:mt-4 mb-4 sm:mb-16 border-b-2 border-gray-100 pb-4">
        Leaderboard
      </h1>
      <div className="relative w-11/12 sm:w-1/4 mx-auto sm:ml-auto sm:mr-0 border-2 p-2 my-6 rounded-md text-gray-500 text-base leading-6">
        <div className="absolute left-2">
          <SearchIcon />
        </div>
        <input
          placeholder="Nickname Search"
          className="ml-8 w-10/12 focus:outline-none"
          onChange={(e) => setNicknameSearch(e.target.value)}
          value={nicknameSearch}
        />
      </div>

      <table className="border-gray-200 border-2 rounded-md p-4 border-collapse">
        <tr className="text-center text-gray-500 text-xs bg-gray-100 uppercase">
          <th className="py-2">Rank</th>
          <th className="py-2">Nickname</th>
          <th className="py-2">Country</th>
          <th className="py-2">Score</th>
        </tr>
        {!leaderboard ||
          (leaderboard.length === 0 && (
            <td
              rowSpan="6"
              colSpan="4"
              className="text-gray-500 text-lg text-center py-8"
            >
              No tournaments have been completed.
            </td>
          ))}
        {!loading &&
          leaderboard.map((player) => (
            <tr
              key={`leaderboard-player-${player.id}`}
              className="text-center border-b-2 border-black py-4 text-sm"
            >
              <td className="py-2">{player.rank}</td>
              <td className="py-2 flex justify-center">
                <PlayerProfileItem player={player.player} />
              </td>
              <td className="py-2">{player.player?.country}</td>
              <td className="py-2">{player.totalScore}</td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default LeaderboardPage
