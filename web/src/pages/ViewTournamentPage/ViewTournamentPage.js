import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import TournamentLeaderboardTab from 'src/components/TournamentLeaderboardTab/TournamentLeaderboardTab'
import TournamentMatchesTab from 'src/components/TournamentMatchesTab/TournamentMatchesTab'
import TournamentRoundsTab from 'src/components/TournamentRoundsTab/TournamentRoundsTab'
import TournamentSignupTab from 'src/components/TournamentSignupTab/TournamentSignupTab'
import TournamentTimer from 'src/components/TournamentTimer/TournamentTimer'
import { calcNumRounds } from 'src/helpers/tournamentHelper'
import { ReactComponent as CalendarIcon } from 'src/components/Icons/CalendarIcon.svg'
import { ReactComponent as PlayersIcon } from 'src/components/Icons/PlayersIcon.svg'
import { ReactComponent as LocationIcon } from 'src/components/Icons/PlayersIcon.svg'
import { ReactComponent as MatchIcon } from 'src/components/Icons/MatchIcon.svg'
import Truncate from 'react-truncate-html'

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
      locationName
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
  const [startingTimerInSeconds, setStartingTimerInSeconds] =
    React.useState(null)
  const [timerInSeconds, setTimerSeconds] = React.useState(null)
  const { currentUser, hasRole } = useAuth()
  const [expandedDesc, setExpandedDesc] = React.useState(false)
  const MAX_STRING_LENGTH = 150

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
          'border-gray-50 border-2 rounded hover:bg-green-500 cursor-pointer py-4 px-8 w-4/12 text-center capitalize' +
          (tab === tabOption ? ' bg-green-100' : '')
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

  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  if (loading) {
    return <h1>Loading</h1>
  }

  const {
    name,
    startDate,
    maxPlayers,
    players,
    desc,
    street1,
    locationName,
    city,
    state,
  } = tournament

  return (
    <div>
      <div className="w-full px-10 flex flex-col sm:flex-row text-sm">
        <div className="w-full sm:w-3/4 pt-4 sm:pt-0">
          <h1 className="text-xl">{name}</h1>
          <div className="py-2 my-2 border-gray-100 border-t-2 border-b-2 text-gray-400 leading-relaxed">
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <CalendarIcon />
              </div>{' '}
              <span className="ml-1">
                {new Date(startDate).toLocaleString()}
              </span>
            </p>
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <PlayersIcon />
              </div>{' '}
              <span className="ml-1">
                {players?.length}/{maxPlayers} Players Registered
              </span>
            </p>
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <LocationIcon />
              </div>{' '}
              <span className="ml-1">
                {locationName}, {street1}
              </span>
            </p>
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <MatchIcon />
              </div>{' '}
              <span className="ml-1">
                Recommended Number of Rounds:{' '}
                {calcNumRounds(tournament.players.length)}
              </span>
            </p>
            {tournament.active &&
              !tournament.dateEnded &&
              (tournament.ownerId === currentUser?.user?.id ||
                hasRole('ADMIN')) && (
                <Link
                  className="flex w-60 items-center px-4 py-2 bg-green-700 hover:bg-green-500 my-4 text-white rounded-md uppercase text-sm"
                  to={routes.eoEditTournament({
                    url: tournament.tournamentUrl,
                  })}
                >
                  <span>Edit Tournament Details</span>
                </Link>
              )}
          </div>

          {expandedDesc ? (
            <div className="flex flex-col">
              <div
                className="leading-normal text-sm"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
              <button
                onClick={() => setExpandedDesc(false)}
                className="hover:text-blue-500 text-blue-400 flex items-center max-w-prose"
              >
                <span>Collapse Description</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex  flex-col">
              <Truncate
                lines={3}
                className="leading-normal text-sm"
                dangerouslySetInnerHTML={{
                  __html: desc,
                }}
              />
              <button
                onClick={() => setExpandedDesc(true)}
                className="hover:text-blue-500 text-blue-400 flex items-center max-w-prose"
              >
                <span>Read More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}

          {tournament.winners.length > 0 && (
            <div>
              <div className="font-bold">WINNERS</div>{' '}
              {tournament.winners.map((winner) => (
                <p key={`winner-${winner.id}`}>{winner.player.nickname}</p>
              ))}
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/4 ml-auto">
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
          {!tournament.active && <p>Tournament Cancelled</p>}
        </div>
      </div>
      <div className="flex w-full my-4 border-green-700 border-t-4 border-b-4">
        {renderTabNav()}
      </div>
      <div className="flex w-full px-10">{renderTab()}</div>
    </div>
  )
}

export default ViewTournamentPage
