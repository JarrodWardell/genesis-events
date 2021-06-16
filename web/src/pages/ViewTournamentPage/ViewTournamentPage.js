import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { Toaster } from 'react-hot-toast'
import TournamentLeaderboardTab from 'src/components/TournamentLeaderboardTab/TournamentLeaderboardTab'
import TournamentMatchesTab from 'src/components/TournamentMatchesTab/TournamentMatchesTab'
import TournamentRoundsTab from 'src/components/TournamentRoundsTab/TournamentRoundsTab'
import TournamentSignupTab from 'src/components/TournamentSignupTab/TournamentSignupTab'
import TournamentTimer from 'src/components/TournamentTimer/TournamentTimer'
import {
  calcNumRounds,
  timeUntilTournament,
} from 'src/helpers/tournamentHelper'
import EOEditTournamentPage from '../EoEditTournamentPage/EoEditTournamentPage'

export const TOURNAMENT_BY_URL = gql`
  query tournamentByUrl($url: String!) {
    tournamentByUrl: tournamentByUrl(url: $url) {
      id
      tournamentUrl
      name
      desc
      startDate
      dateStarted
      dateEnded
      maxPlayers
      timerLeftInSeconds
      timerStatus
      startingTimerInSeconds
      timerLastUpdated
      lat
      lng
      street1
      city
      country
      state
      zip
      owner {
        nickname
      }
      ownerId
      store {
        name
      }
      players {
        id
        score
        wins
        byes
        draws
        losses
        player {
          id
          nickname
        }
      }
      winners {
        id
        wonTournament
        score
        wins
        byes
        draws
        losses
        player {
          id
          nickname
        }
      }
      round {
        id
        roundNumber
        matches {
          id
          players {
            id
            user {
              id
              nickname
            }
            score
            bye
            wonMatch
          }
          updatedAt
        }
        createdAt
      }
      active
    }
  }
`

const ViewTournamentPage = ({ url, tab, tabOptions }) => {
  const TABS = ['rounds', 'leaderboard', 'matches', 'signup']
  const [startingTimerInSeconds, setStartingTimerInSeconds] = React.useState(
    null
  )
  const [timerInSeconds, setTimerSeconds] = React.useState(null)
  const { currentUser, hasRole } = useAuth()

  if (!tab || tab === '' || TABS.indexOf(tab) === -1) {
    return <Redirect to={`/tournament/${url}/${TABS[0]}`} />
  }

  const {
    loading,
    error,
    data: { tournamentByUrl: tournament } = {},
  } = useQuery(TOURNAMENT_BY_URL, {
    variables: { url },
    pollInterval: 10000,
  })

  const renderTabNav = () => {
    return TABS.map((tabOption) => (
      <div
        className={
          'border-gray-50 border-2 rounded hover:bg-green-400 cursor-pointer uppercase py-4 px-8 w-4/12 text-center' +
          (tab === tabOption ? ' bg-green-600' : '')
        }
        key={`tab-${tabOption}`}
        onClick={() => navigate(`/tournament/${url}/${tabOption}`)}
      >
        {tabOption}
      </div>
    ))
  }

  const renderTab = () => {
    switch (tab) {
      case TABS[0]:
        return (
          <TournamentRoundsTab
            tournament={tournament}
            roundNumber={tabOptions}
          />
        )
      case TABS[1]:
        return <TournamentLeaderboardTab tournament={tournament} />
      case TABS[2]:
        return <TournamentMatchesTab tournament={tournament} />
      case TABS[3]:
        return <TournamentSignupTab tournament={tournament} />
    }
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  if (loading) {
    return <div>Loading</div>
  }

  const { name, startDate, maxPlayers, players, desc } = tournament

  return (
    <div>
      <div className="w-full px-10 flex">
        <div className="w-3/4">
          <h1>{name}</h1>
          <h1>
            {players?.length}/{maxPlayers} Players
          </h1>
          <h1>{new Date(startDate).toString()}</h1>
          <h1>Estimated Rounds: {calcNumRounds(tournament.players.length)}</h1>
          <div
            className="overflow-hidden truncate overflow-ellipsis"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          {tournament.winners.length > 0 && (
            <div>
              <div className="font-bold">WINNERS</div>{' '}
              {tournament.winners.map((winner) => (
                <p key={`winner-${winner.id}`}>{winner.player.nickname}</p>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/4 ml-auto">
          {tournament.active &&
            tournament.dateStarted &&
            !tournament.dateEnded && (
              <TournamentTimer
                tournament={tournament}
                startingTimerInSeconds={startingTimerInSeconds}
                setStartingTimerInSeconds={setStartingTimerInSeconds}
                timerInSeconds={timerInSeconds}
                setTimerSeconds={setTimerSeconds}
              />
            )}
          {tournament.active &&
            !tournament.dateEnded &&
            (tournament.ownerId === currentUser?.user?.id ||
              hasRole('ADMIN')) && (
              <Link
                className="p-4 bg-green-400 hover:bg-green-600 my-4"
                to={routes.eoEditTournament({
                  url: tournament.tournamentUrl,
                })}
              >
                Edit Tournament
              </Link>
            )}
          {!tournament.active && <p>Tournament Cancelled</p>}
        </div>
      </div>
      <div className="flex w-full my-4">{renderTabNav()}</div>
      <div className="flex w-full px-10">{renderTab()}</div>
    </div>
  )
}

export default ViewTournamentPage
