import { navigate, useLocation } from '@redwoodjs/router'

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation()

  const renderTabNav = () => {
    const TABS = [
      'users',
      'tournaments',
      'stores',
      'player-tournament-scores',
      'player-match-scores',
      'matches',
      'rounds',
      'banners',
      'user-pictures',
      'user-user-roles',
      'contacts',
    ]

    return TABS.map((tabOption) => {
      return (
        <div
          className={
            'border-gray-50 border-2 hover:bg-green-400 cursor-pointer py-4 px-8 w-full text-center capitalize' +
            (pathname.includes(tabOption) ? ' bg-green-600' : '')
          }
          key={`tab-${tabOption}`}
          onClick={() => navigate(`/admin/${tabOption}`)}
        >
          {tabOption}
        </div>
      )
    })
  }

  return (
    <div className="flex">
      <div className="w-1/5 flex flex-col">{renderTabNav()}</div>
      <div className="w-4/5 p-4 overflow-y-scroll">{children}</div>
    </div>
  )
}

export default AdminLayout
