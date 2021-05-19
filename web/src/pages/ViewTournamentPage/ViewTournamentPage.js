import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { object } from 'prop-types'
import { Toaster } from 'react-hot-toast'
import TournamentLeaderboardTab from 'src/components/TournamentLeaderboardTab/TournamentLeaderboardTab'
import TournamentMatchesTab from 'src/components/TournamentMatchesTab/TournamentMatchesTab'
import TournamentRoundsTab from 'src/components/TournamentRoundsTab/TournamentRoundsTab'
import TournamentSignupTab from 'src/components/TournamentSignupTab/TournamentSignupTab'

export const TOURNAMENT_BY_URL = gql`
  query tournamentByUrl($url: String!) {
    tournamentByUrl: tournamentByUrl(url: $url) {
      id
      name
      desc
      startDate
      tournamentUrl
      dateStarted
      maxPlayers
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
      round {
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
        }
        timeStatus
        timeLeftInSeconds
      }
    }
  }
`

const ViewTournamentPage = ({ url, tab }) => {
  const TABS = ['rounds', 'leaderboard', 'matches', 'signup']

  if (!tab || tab === '' || TABS.indexOf(tab) === -1) {
    return <Redirect to={`/tournament/${url}/${TABS[0]}`} />
  }

  const {
    loading,
    error,
    data: { tournamentByUrl: tournament } = {},
  } = useQuery(TOURNAMENT_BY_URL, {
    variables: { url },
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
        return <TournamentRoundsTab tournament={tournament} />
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

  const timeToTournament = (tournament) => {
    if (!tournament.dateStarted) {
      return <h1>Tournament to begin in </h1>
    }
  }

  const { name, startDate, maxPlayers, players, desc } = tournament

  return (
    <div>
      <Toaster />
      <div className="w-full px-10">
        <h1>{name}</h1>
        <h1>
          {players.length}/{maxPlayers} Players
        </h1>
        <h1>{new Date(startDate).toString()}</h1>
        {timeToTournament(tournament)}
        <div
          className="overflow-hidden truncate overflow-ellipsis"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      </div>
      <div className="flex w-full my-4">{renderTabNav()}</div>
      <div className="flex w-full px-10">{renderTab()}</div>
    </div>
  )
}

export default ViewTournamentPage
