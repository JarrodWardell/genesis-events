import { useAuth } from '@redwoodjs/auth'
import Header from 'src/components/Header/Header'
import HomeBannersCell from 'src/components/HomeBannersCell/HomeBannersCell'
import { CORE_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import { useQuery } from '@redwoodjs/web'
import TournamentItem from 'src/components/TournamentItem/TournamentItem'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

export const HOMEPAGE_QUERY = gql`
  ${CORE_TOURNAMENT_FIELDS}
  query MyTournamentsQuery {
    myTournaments {
      ...CoreTournamentFields
    }
    currentTournaments {
      ...CoreTournamentFields
    }
    finishedTournaments {
      ...CoreTournamentFields
    }
    upcomingTournaments {
      ...CoreTournamentFields
    }
  }
`

const HomePage = () => {
  const { currentUser } = useAuth()
  const {
    loading,
    error,
    data: {
      upcomingTournaments,
      myTournaments,
      finishedTournaments,
      currentTournaments,
    } = {},
  } = useQuery(HOMEPAGE_QUERY, {
    variables: {},
  })

  return (
    <>
      <Header />
      <HomeBannersCell />
      <div className="flex flex-col mt-4 px-2">
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <div className="flex flex-col container mx-auto w-11/12 sm:w-full text-sm text-gray-700">
              {currentUser && myTournaments && myTournaments.length > 0 && (
                <div className="my-8">
                  <h1 className="text-xl text-black mb-4">
                    Registered Tournaments
                  </h1>
                  {myTournaments.map((tournament, index) => (
                    <TournamentItem
                      tournament={tournament}
                      key={tournament.id}
                      index={index}
                      full={true}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col container mx-auto w-11/12 sm:w-full text-sm text-gray-700">
              {currentTournaments && currentTournaments.length > 0 && (
                <div className="mt-4 mb-8">
                  <h1 className="text-xl text-black mb-4">
                    Current Tournaments
                  </h1>
                  {currentTournaments.map((tournament, index) => (
                    <TournamentItem
                      tournament={tournament}
                      key={tournament.id}
                      index={index}
                      full={true}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-x-24 container mx-auto grid-cols-1 max-h-screen overflow-auto">
              <div className="flex flex-col sm:w-3/4">
                <h1 className="text-xl text-black mb-4">
                  Upcoming Tournaments
                </h1>
                {upcomingTournaments && upcomingTournaments.length > 0 ? (
                  upcomingTournaments.map((tournament, index) => (
                    <TournamentItem
                      tournament={tournament}
                      key={tournament.id}
                      index={index}
                      full={false}
                    />
                  ))
                ) : (
                  <div className="border-gray-200 border-t pt-2 text-center">
                    No Upcoming Tournaments Found
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:w-3/4 mt-4 sm:mt-0 max-h-screen overflow-auto">
                <h1 className="text-xl text-black mb-4">
                  Completed Tournaments
                </h1>
                {finishedTournaments && finishedTournaments.length > 0 ? (
                  finishedTournaments.map((tournament, index) => (
                    <TournamentItem
                      tournament={tournament}
                      key={tournament.id}
                      index={index}
                      full={false}
                    />
                  ))
                ) : (
                  <div className="border-gray-200 border-t pt-2 text-center">
                    No Completed Tournaments Found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
