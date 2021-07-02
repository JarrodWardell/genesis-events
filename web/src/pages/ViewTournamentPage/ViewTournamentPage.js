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
import { ReactComponent as LocationIcon } from 'src/components/Icons/LocationIcon.svg'
import { ReactComponent as InfoIcon } from 'src/components/Icons/InfoIcon.svg'
import { ReactComponent as ClockIcon } from 'src/components/Icons/ClockIcon.svg'
import { ReactComponent as HomeIcon } from 'src/components/Icons/HomeIcon.svg'
import { ReactComponent as TrophyIcon } from 'src/components/Icons/TrophyIcon.svg'
import Truncate from 'react-truncate-html'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

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
            user {
              id
              nickname
              photo {
                url
                smallUrl
                name
              }
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
  const { currentUser, hasRole } = useAuth()
  const [expandedDesc, setExpandedDesc] = React.useState(false)
  const [isTruncated, setIsTruncated] = React.useState(false)

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

  if (loading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <LoadingIcon size={24} />
      </div>
    )
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
    <div className="flex flex-col">
      <div className="w-full px-10 flex flex-col sm:flex-row text-sm">
        <div className="w-full sm:w-5/6 pt-4 sm:pt-0">
          <h1 className="text-xl">{name}</h1>
          <div className="py-2 my-2 border-gray-100 border-t-2 border-b-2 text-gray-400 leading-relaxed">
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <CalendarIcon />
              </div>{' '}
              <span className="ml-1">
                {new Date(startDate).toLocaleString().split(',')[0]}
              </span>
            </p>
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <ClockIcon />
              </div>{' '}
              <span className="ml-1">
                {new Date(startDate).toLocaleString().split(',')[1]}
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
                <InfoIcon />
              </div>{' '}
              <span className="ml-1">
                Recommended Number of Rounds:{' '}
                {calcNumRounds(tournament.players.length)}
              </span>
            </p>
            <p className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <HomeIcon />
              </div>{' '}
              <span className="ml-1">{locationName}</span>
            </p>
            {tournament.street1 && (
              <p className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <LocationIcon />
                </div>{' '}
                <span className="ml-1">{street1}</span>
              </p>
            )}
            {tournament.winners.length > 0 && (
              <p className="flex items-center font-bold ">
                <div className="w-6 h-6 flex justify-center items-center">
                  <TrophyIcon />
                </div>{' '}
                <span className="ml-1">
                  {tournament.winners.map((winner, index) => (
                    <span key={`winner-${winner.id}`}>
                      {index > 0 && ', '}
                      {winner.player.nickname}
                    </span>
                  ))}
                </span>
              </p>
            )}

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
        <div className="w-full sm:w-1/6 ml-auto">
          {tournament.active &&
            tournament.dateStarted &&
            !tournament.dateEnded && (
              <TournamentTimer tournament={tournament} />
            )}
          {!tournament.active && <p>Tournament Cancelled</p>}
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
        {TABS.map((tabOption) => (
          <option value={tabOption} key={tabOption}>
            {tabOption}
          </option>
        ))}
      </select>
      <div className="flex w-full px-2 pb-8 sm:px-10 sm:pb-2">
        {renderTab()}
      </div>
    </div>
  )
}

export default ViewTournamentPage
