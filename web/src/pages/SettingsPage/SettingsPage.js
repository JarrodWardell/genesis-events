import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import PasswordSettingsTab from 'src/components/PasswordSettingsTab/PasswordSettingsTab'
import StoreSettingsTab from 'src/components/StoreSettingsTab/StoreSettingsTab'
import UserSettingsTab from 'src/components/UserSettingsTab/UserSettingsTab'

const SettingsPage = ({ tab }) => {
  const { currentUser, hasRole } = useAuth()
  const TABS = ['user', 'password', 'store']

  if (!tab || tab === '' || TABS.indexOf(tab) === -1) {
    return <Redirect to={`/settings/${TABS[0]}`} />
  }

  const renderTabNav = () => {
    return TABS.map((tabOption) => (
      <div
        className={
          'border-gray-50 border-2 hover:bg-green-400 cursor-pointer uppercase py-4 px-8 w-full text-center' +
          (tab === tabOption ? ' bg-green-600' : '')
        }
        key={`tab-${tabOption}`}
        onClick={() => navigate(`/settings/${tabOption}`)}
      >
        {tabOption}
      </div>
    ))
  }

  const renderTab = () => {
    switch (tab) {
      case TABS[0]:
        return <UserSettingsTab />
      case TABS[1]:
        return <PasswordSettingsTab />
      case TABS[2]:
        return <StoreSettingsTab />
    }
  }

  return (
    <div className="flex container mx-auto my-12">
      <div className="flex flex-col w-1/4">{renderTabNav()}</div>
      <div className="flex flex-col w-3/4 p-8">{renderTab()}</div>
    </div>
  )
}

export default SettingsPage
