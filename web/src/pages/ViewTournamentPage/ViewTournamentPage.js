import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { format } from 'date-fns'
import TournamentLeaderboardTab from 'src/components/TournamentLeaderboardTab/TournamentLeaderboardTab'
import TournamentMatchesTab from 'src/components/TournamentMatchesTab/TournamentMatchesTab'
import TournamentRoundsTab from 'src/components/TournamentRoundsTab/TournamentRoundsTab'
import TournamentSignupTab from 'src/components/TournamentSignupTab/TournamentSignupTab'
import TournamentTimer from 'src/components/TournamentTimer/TournamentTimer'
import { calcNumRounds } from 'src/helpers/tournamentHelper'
import { ReactComponent as CalendarIcon } from 'src/components/Icons/CalendarIcon.svg'
import { ReactComponent as PlayersIcon } from 'src/components/Icons/PlayersIcon.svg'
import { ReactComponent as LocationIcon } from 'src/components/Icons/LocationIcon.svg'
import { ReactComponent as InfoIcon } from 'src/components/Icons/InfoIcon.svg'
import { ReactComponent as ClockIcon } from 'src/components/Icons/ClockIcon.svg'
import { ReactComponent as HomeIcon } from 'src/components/Icons/HomeIcon.svg'
import { ReactComponent as TrophyIcon } from 'src/components/Icons/TrophyIcon.svg'
import Truncate from 'react-truncate-html'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import { AtSymbolIcon } from '@heroicons/react/solid'
import { BookOpenIcon } from '@heroicons/react/outline'

export const TOURNAMENT_BY_URL = gql`
  query tournamentByUrl($url: String!) {
    tournamentByUrl: tournamentByUrl(url: $url) {
      id
      tournamentUrl
      name
      desc
      type
      startDate
      dateStarted
      dateEnded
      maxPlayers
      publicRegistration
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
        email
      }
      players {
        id
        score
        wins
        byes
        draws
        losses
        active
        playerName
        player {
          id
          nickname
          photo {
            url
            smallUrl
            name
          }
        }
      }
      winners {
        id
        wonTournament
        playerName
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
        roundTimerLeftInSeconds
        matches {
          id
          players {
            id
            playerName
            score
            bye
            wonMatch
            userId
            user {
              id
              nickname
              photo {
                url
                smallUrl
                name
              }
            }
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
  const TABS = {
    rounds: {
      text: 'Rounds',
      path: 'rounds',
    },
    leaderboard: {
      text: 'Leaderboard',
      path: 'leaderboard',
    },
    matches: {
      text: 'Matches',
      path: 'matches',
    },
    signup: {
      text: 'Sign Up',
      path: 'signup',
    },
  }
  const { currentUser, hasRole } = useAuth()
  const [expandedDesc, setExpandedDesc] = React.useState(false)

  if (!tab || tab === '' || !(tab in TABS)) {
    return <Redirect to={`/tournament/${url}/${TABS.rounds.path}`} />
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
    return Object.keys(TABS).map((tabKey) => {
      let tabOption = TABS[tabKey]

      return (
        <button
          className={
            'border-gray-50 border-2 rounded hover:bg-green-500 cursor-pointer py-4 px-8 w-4/12 text-center capitalize' +
            (tab === tabOption.path ? ' bg-green-100' : '')
          }
          key={`tab-${tabOption.path}`}
          onClick={() => navigate(`/tournament/${url}/${tabOption.path}`)}
        >
          {tabOption.text}
        </button>
      )
    })
  }

  const renderTab = () => {
    switch (tab) {
      case TABS.rounds.path:
        return (
          <TournamentRoundsTab
            tournament={tournament}
            roundNumber={tabOptions}
          />
        )
      case TABS.leaderboard.path:
        return <TournamentLeaderboardTab tournament={tournament} />
      case TABS.matches.path:
        return <TournamentMatchesTab tournament={tournament} />
      case TABS.signup.path:
        return <TournamentSignupTab tournament={tournament} />
    }
  }

  if (loading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <LoadingIcon size={24} />
      </div>
    )
  }

  if (tournament) {
    const {
      name,
      startDate,
      maxPlayers,
      players,
      desc,
      street1,
      locationName,
    } = tournament

    let tournamentActive =
      tournament.active && tournament.dateStarted && !tournament.dateEnded

    return (
      <div className="flex flex-col">
        <div className="w-full px-10 flex flex-col sm:flex-row text-sm">
          <div
            className={
              'w-full pt-4 sm:pt-0' +
              (tournamentActive || !tournament.active ? ' sm:w-5/6' : ' w-full')
            }
          >
            <h1 className="text-xl">{name}</h1>
            <div className="py-2 my-2 border-gray-100 border-t-2 border-b-2 text-gray-400 leading-relaxed">
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <CalendarIcon />
                </div>{' '}
                <span className="ml-1">
                  {format(new Date(startDate), 'PP')}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <ClockIcon />
                </div>{' '}
                <span className="ml-1">
                  {format(new Date(startDate), 'p zzzz')}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <PlayersIcon />
                </div>{' '}
                <span className="ml-1">
                  {players?.length}/{maxPlayers} Players Registered
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <AtSymbolIcon />
                </div>{' '}
                <a
                  className="ml-1"
                  href={`mailto: ${tournament?.store?.email}`}
                >
                  {tournament?.store?.email}
                </a>
              </div>
              {tournament.type && (
                <div className="flex items-center">
                  <div className="w-6 h-6 flex font-bold">
                    <BookOpenIcon />
                  </div>{' '}
                  <span className="ml-1">{tournament?.type}</span>
                </div>
              )}
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <InfoIcon />
                </div>{' '}
                <span className="ml-1">
                  Recommended Number of Rounds:{' '}
                  {calcNumRounds(tournament.players.length)}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <HomeIcon />
                </div>{' '}
                <span className="ml-1">{locationName}</span>
              </div>
              {tournament.street1 && (
                <div className="flex items-center">
                  <div className="w-6 h-6 flex font-bold">
                    <LocationIcon />
                  </div>{' '}
                  <span className="ml-1">{street1}</span>
                </div>
              )}
              {tournament.winners.length > 0 && (
                <div className="flex items-center font-bold ">
                  <div className="w-6 h-6 flex justify-center items-center">
                    <TrophyIcon />
                  </div>{' '}
                  <span className="ml-1">
                    {tournament.winners.map((winner, index) => (
                      <span key={`winner-${winner.id}`}>
                        {index > 0 && ', '}
                        {winner.player?.nickname || winner.playerName}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {tournament.active &&
                !tournament.dateEnded &&
                (tournament.ownerId === currentUser?.user?.id ||
                  hasRole('ADMIN')) && (
                  <Link
                    className="flex w-60 justify-center px-4 py-2 bg-green-700 hover:bg-green-500 my-4 text-white rounded-md uppercase text-sm"
                    to={routes.eoEditTournament({
                      url: tournament.tournamentUrl,
                    })}
                  >
                    <span>Edit Tournament Details</span>
                  </Link>
                )}
            </div>

            {tournament.desc !== '<p><br></p>' &&
              (expandedDesc ? (
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
                    onTr
                    dangerouslySetInnerHTML={{
                      __html: desc,
                    }}
                  />
                  {desc.length > 150 && (
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
                  )}
                </div>
              ))}
          </div>
          <div
            className={
              'w-full ml-auto' +
              (tournamentActive || !tournament.active
                ? ' sm:w-1/6 '
                : ' hidden')
            }
          >
            {tournamentActive && <TournamentTimer tournament={tournament} />}
            {!tournament.active && (
              <div className="rounded-md bg-red-600 m-4 text-white p-2 text-center">
                Tournament Cancelled
              </div>
            )}
          </div>
        </div>
        <div className="w-full my-4 hidden sm:flex px-10">
          <div className="w-full border-green-700 border-t-4 border-b-4 flex">
            {renderTabNav()}
          </div>
        </div>
        <select
          className="mx-auto w-11/12 border-t-8 border-b-8 border border-green-700 sm:hidden capitalize text-center text-base my-4 py-2"
          value={tab}
          onChange={(e) => navigate(`/tournament/${url}/${e.target.value}`)}
        >
          {Object.keys(TABS).map((tabOptionKey) => {
            let tabOption = TABS[tabOptionKey]
            return (
              <option value={tabOption.path} key={tabOption.path}>
                {tabOption.text}
              </option>
            )
          })}
        </select>
        <div className="flex w-full px-2 pb-8 sm:px-10 sm:pb-2">
          {renderTab()}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default ViewTournamentPage
