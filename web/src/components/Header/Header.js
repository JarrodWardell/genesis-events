import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const Header = () => {
  const { isAuthenticated, logOut, currentUser, hasRole } = useAuth()
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link to={routes.home()}>{'Genesis Event Organizer'}</Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Tournaments
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Leaderboard
              </a>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center">
              {((hasRole(['EO']) && currentUser?.stores[0]?.approved) ||
                hasRole('ADMIN')) && (
                <div className="flex-shrink-0">
                  <Link
                    to={routes.createTournament()}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>New Tournament</span>
                  </Link>
                </div>
              )}

              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu-button"
                      aria-expanded={menuOpen}
                      aria-haspopup="true"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      {/*
                        User image
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=EMz39Y1YIM&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        */}
                    </button>
                  </div>
                  {menuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        {currentUser?.user?.nickname}
                      </div>
                      <Link
                        to={routes.settings()}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-1"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={async () => await logOut()}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <Link to={routes.login()} className="mr-4">
                Login{' '}
              </Link>
              <Link to={routes.signup()}>Signup</Link>
            </div>
          )}
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
            >
              Team
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=EMz39Y1YIM&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {currentUser?.user?.firstName}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  tom@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="block px-4 py-2 text-base font-medium text-gray-500 sm:px-6">
                {currentUser?.user?.nickname}
              </div>
              <Link
                to={routes.settings()}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
              >
                Settings
              </Link>
              <button
                onClick={async () => await logOut()}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
