import { Form, TextField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Link, Redirect, routes } from '@redwoodjs/router'

const ForgotPasswordPage = () => {
  const [error, setError] = React.useState(null)
  const { loading, currentUser, client } = useAuth()

  const onForgotPassword = async (data) => {
    var auth = client.auth()
    await auth.sendPasswordResetEmail(data.email)
    setError(false)
  }

  if (!currentUser?.user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="max-w-6xl">
          <h1>Forgot Password</h1>
          <Form onSubmit={onForgotPassword} className="flex flex-col">
            {error && <p>{error}</p>}
            <TextField
              name="email"
              placeholder="email"
              className="border-2 p-2 mt-4"
            />

            <Submit
              disabled={loading}
              className="h-12 uppercase mt-6 text-white rounded bg-blue-400 hover:bg-blue-600"
            >
              Forgot Password
            </Submit>
          </Form>
          <Link to={routes.login()}>Go Back</Link>
        </div>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default ForgotPasswordPage
