import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  const { loading, isAuthenticated, logIn, logOut } = useAuth()

  return (
    <>
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        <button
          onClick={async () => {
            if (isAuthenticated) {
              await logOut()
              navigate('/')
            } else {
              await logIn()
            }
          }}
        >
          {isAuthenticated ? 'Log out' : 'Log in'}
        </button>
      </p>
    </>
  )
}

export default HomePage
