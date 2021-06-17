import { useAuth } from '@redwoodjs/auth'
import toast from 'react-hot-toast'
import PasswordCheck from '../PasswordCheck/PasswordCheck'

const PasswordSettingsTab = () => {
  const { client, currentUser, logIn } = useAuth()
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = React.useState(
    false
  )

  const onSubmit = async ({ currentPassword, password }) => {
    setLoadingPasswordUpdate(true)
    var auth = client.auth().currentUser
    let credentials = logIn({
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
          .catch((error) => {
            setLoadingPasswordUpdate(false)
            toast.error(
              'There was an error in updating your password. Please try again.'
            )
          })
      })
      .catch((reauthError) => {
        setLoadingPasswordUpdate(false)
        toast.error(
          'There was an error with your current password. Please confirm it is correct before trying again.'
        )
      })
  }

  return (
    <div>
      <PasswordCheck
        onSubmit={onSubmit}
        submitText={'SUBMIT'}
        loading={loadingPasswordUpdate}
        showOldPasswordField={true}
      />
    </div>
  )
}

export default PasswordSettingsTab
