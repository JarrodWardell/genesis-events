import Header from 'src/components/Header/Header'
import HomeBannersCell from 'src/components/HomeBannersCell/HomeBannersCell'
import HomePageCell from 'src/components/HomePageCell/HomePageCell'

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeBannersCell />
      <div className="flex flex-col container mx-auto w-11/12 sm:w-full text-sm text-gray-700">
        <HomePageCell />
      </div>
    </>
  )
}

export default HomePage
