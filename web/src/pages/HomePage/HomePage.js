import Header from 'src/components/Header/Header'
import HomeBannersCell from 'src/components/HomeBannersCell/HomeBannersCell'
import HomePageCell from 'src/components/HomePageCell/HomePageCell'

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeBannersCell />
      <div className="flex flex-col container mx-auto w-full">
        <HomePageCell />
      </div>
    </>
  )
}

export default HomePage
