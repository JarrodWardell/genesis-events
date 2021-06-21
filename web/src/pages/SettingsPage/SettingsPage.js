import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import PasswordSettingsTab from 'src/components/PasswordSettingsTab/PasswordSettingsTab'
import StoreSettingsTab from 'src/components/StoreSettingsTab/StoreSettingsTab'
import UserSettingsTab from 'src/components/UserSettingsTab/UserSettingsTab'

const SettingsPage = ({ tab }) => {
  const { currentUser, hasRole } = useAuth()
  const TABS = {
    user: {
      text: hasRole('Player')
        ? 'Edit Player Profile'
        : 'Edit Event Organizer Profile',
      icon: '',
      permissions: currentUser.user.id !== '',
      path: 'user',
    },
    password: {
      text: 'Password and Security',
      icon: '',
      permissions: currentUser.user.id !== '',
      path: 'password',
    },
    store: {
      text: 'Edit Store Profile',
      icon: '',
      permissions: hasRole(['EO']),
      path: 'store',
    },
  }
  if (!tab || tab === '' || !(tab in TABS)) {
    return <Redirect to={`/settings/${TABS.user.path}`} />
  }

  const renderTabNav = () => {
    return Object.keys(TABS).map((tabKey) => {
      let tabOption = TABS[tabKey]

      if (tabOption.permissions) {
        return (
          <div
            className={
              'border-gray-50 border-2 hover:bg-green-400 cursor-pointer py-4 px-8 w-full text-center' +
              (tab === tabOption.path ? ' bg-green-600' : '')
            }
            key={`tab-${tabOption.path}`}
            onClick={() => navigate(`/settings/${tabOption.path}`)}
          >
            {tabOption.text}
          </div>
        )
      }
    })
  }

  const renderTab = () => {
    switch (tab) {
      case TABS.user.path:
        return <UserSettingsTab />
      case TABS.password.path:
        return <PasswordSettingsTab />
      case TABS.store.path:
        return <StoreSettingsTab />
    }
  }

  return (
    <div className="flex container mx-auto">
      <div className="flex flex-col w-1/5">{renderTabNav()}</div>
      <div className="flex flex-col w-4/5 p-8">{renderTab()}</div>
    </div>
  )
}

export default SettingsPage
