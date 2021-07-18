import { useAuth } from '@redwoodjs/auth'
import Header from 'src/components/Header/Header'
import HomeBannersCell from 'src/components/HomeBannersCell/HomeBannersCell'
import MyTournamentsCell from 'src/components/MyTournamentsCell/MyTournamentsCell'
import FinishedTournamentsCell from 'src/components/FinishedTournamentsCell/FinishedTournamentsCell'
import UpcomingTournamentsCell from 'src/components/UpcomingTournamentsCell/UpcomingTournamentsCell'

const HomePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <Header />
      <HomeBannersCell />
      <div className="flex flex-col mt-4 px-2">
        <div className="flex flex-col container mx-auto w-11/12 sm:w-full text-sm text-gray-700">
          {currentUser && <MyTournamentsCell />}
        </div>
        <div className="grid sm:grid-cols-2 gap-x-24 container mx-auto grid-cols-1 max-h-screen overflow-auto">
          <div className="flex flex-col sm:w-3/4">
            <h1 className="text-xl text-black mb-4">Upcoming Tournaments</h1>
            <UpcomingTournamentsCell />
          </div>
          <div className="flex flex-col sm:w-3/4 mt-4 sm:mt-0 max-h-screen overflow-auto">
            <h1 className="text-xl text-black mb-4">Finished Tournaments</h1>
            <FinishedTournamentsCell />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
