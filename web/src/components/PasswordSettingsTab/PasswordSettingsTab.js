import { useAuth } from '@redwoodjs/auth'
import toast from 'react-hot-toast'
import { logError } from 'src/helpers/errorLogger'
import PasswordCheck from '../PasswordCheck/PasswordCheck'

const PasswordSettingsTab = () => {
  const { client, currentUser, logIn } = useAuth()
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] =
    React.useState(false)

  const onSubmit = async ({ currentPassword, password }) => {
    setLoadingPasswordUpdate(true)
    var auth = client.auth().currentUser
    logIn({
      email: currentUser?.user?.email,
      password: currentPassword,
    })
      .then(() => {
        auth
          .updatePassword(password)
          .then(() => {
            setLoadingPasswordUpdate(false)
            toast.success('Successfully updated your password!')
          })
          .catch(() => {
            setLoadingPasswordUpdate(false)
            toast.error(
              'There was an error in updating your password. Please try again.'
            )
          })
      })
      .catch((error) => {
        setLoadingPasswordUpdate(false)
        logError({
          error,
          log: false,
          showToast: true,
          customMessage:
            'Your current password is incorrect. Please confirm it is correct before trying again.',
        })
      })
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-gray-900 text-xl mb-4">Edit Password</h1>
      <PasswordCheck
        onSubmit={onSubmit}
        submitText={'SUBMIT'}
        loading={loadingPasswordUpdate}
        showOldPasswordField={true}
        submitColor="blue"
      />
    </div>
  )
}

export default PasswordSettingsTab
