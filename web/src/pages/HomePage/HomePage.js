import { useAuth } from '@redwoodjs/auth'
import MyTournamentsCell from 'src/components/MyTournamentsCell/MyTournamentsCell'

const HomePage = () => {
  const { loading, isAuthenticated, logIn, logOut } = useAuth()

  return (
    <>
      <h1>HomePage</h1>
      <MyTournamentsCell />
    </>
  )
}

export default HomePage
