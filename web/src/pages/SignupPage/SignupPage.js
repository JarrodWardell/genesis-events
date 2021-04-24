import {
  Form,
  TextField,
  PasswordField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { Redirect } from '@redwoodjs/router'

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const SignupPage = () => {
  const [error, setError] = React.useState(null)
  const { signUp, loading, currentUser } = useAuth()
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER)

  const onSubmit = async (data) => {
    await signUp({ ...data })
    let newData = { ...data }
    delete newData.password
    delete newData.email
    createUser({
      variables: {
        input: {
          ...newData,
        },
      },
    })
    setError(null)
  }

  const onProviderClick = async (provider) => {
    await signUp(provider)
    createUser({
      variables: {
        input: {
          role: 'PLAYER',
        },
      },
    })
  }

  if (!currentUser?.user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="max-w-6xl">
          <h1>Sign Up</h1>
          <Form onSubmit={onSubmit} className="flex flex-col">
            {error && <p>{error}</p>}
            <TextField
              name="email"
              placeholder="email"
              className="border-2 p-2 mt-4"
            />
            <TextField
              name="firstname"
              placeholder="first name"
              className="border-2 p-2 mt-4"
            />
            <TextField
              name="lastname"
              placeholder="last name"
              className="border-2 p-2 mt-4"
            />
            <PasswordField
              name="password"
              placeholder="password"
              className="border-2 p-2 mt-4"
            />
            <SelectField name="role" validation={{ required: true }}>
              <option value="PLAYER">Player</option>
              <option value="EO">Event Organizer</option>
            </SelectField>

            <Submit
              disabled={loading}
              className="h-12 uppercase mt-6 text-white rounded bg-blue-400 hover:bg-blue-600"
            >
              Sign Up
            </Submit>
          </Form>
          <h1 className="text-center my-4">Or</h1>
          <button
            disabled={loading || createUserLoading}
            onClick={async () => await onProviderClick('google.com', 'GOOGLE')}
            className="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900"
          >
            <i className="fa fa-google mr-2"></i>Google
          </button>
        </div>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default SignupPage
