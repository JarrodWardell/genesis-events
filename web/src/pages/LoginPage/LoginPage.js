import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes, Link } from '@redwoodjs/router'
import { GoogleIcon } from 'src/components/Icons/Google'
import { FacebookIcon } from 'src/components/Icons/Facebook'
import { TwitterIcon } from 'src/components/Icons/Twitter'

const LoginPage = () => {
  const [error, setError] = React.useState(null)
  const { logIn, loading, currentUser } = useAuth()

  const onSubmit = async (data) => {
    await logIn({ ...data })
    setError(null)
  }

  const onProviderClick = async (provider) => {
    await logIn(provider)
  }

  if (!currentUser?.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="/Logo.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form onSubmit={onSubmit} className="flex flex-col">
              {error && <p>{error}</p>}
              <TextField
                name="email"
                placeholder="email"
                className="border-2 p-2 mt-4"
              />
              <PasswordField
                name="password"
                placeholder="password"
                className="border-2 p-2 mt-4"
              />
              <div className="text-sm my-4 text-center">
                <Link
                  to={routes.forgotPassword()}
                  className="font-medium text-indigo-600 hover:text-indigo-500 "
                >
                  Forgot your password?
                </Link>
              </div>

              <Submit
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </Submit>
            </Form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <button
                    disabled={loading}
                    onClick={async () =>
                      await onProviderClick('google.com', 'GOOGLE')
                    }
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <GoogleIcon />
                  </button>
                </div>

                <div>
                  <button
                    disabled={loading}
                    onClick={async () =>
                      await onProviderClick('twitter.com', 'TWITTER')
                    }
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <TwitterIcon />
                  </button>
                </div>

                <div>
                  <button
                    disabled={loading}
                    onClick={async () =>
                      await onProviderClick('facebook.com', 'FACEBOOK')
                    }
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <FacebookIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default LoginPage
