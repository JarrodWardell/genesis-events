import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const Header = () => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  return (
    <div className="flex px-12 justify-between">
      <Link to={routes.home()}>{'Genesis Event Organizer'}</Link>
      <div className="">
        {isAuthenticated ? (
          <>
            {currentUser?.user?.firstName || currentUser?.email}
            <button className="ml-4" onClick={async () => await logOut()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={routes.login()}>Login </Link>
            <Link to={routes.signup()}>Signup</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
