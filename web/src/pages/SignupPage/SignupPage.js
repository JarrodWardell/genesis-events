import {
  Form,
  TextField,
  Submit,
  Label,
  DateField,
  TextAreaField,
  FormError,
  SelectField,
} from '@redwoodjs/forms'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes, Redirect } from '@redwoodjs/router'

import NicknameCheckField from 'src/components/NicknameCheckField/NicknameCheckField'
import { getAddress } from 'src/helpers/formatAddress'
import { analytics } from 'src/App'
import UserPictureSelector from 'src/components/UserPictureSelector/UserPictureSelector'
import PasswordCheck from 'src/components/PasswordCheck/PasswordCheck'
import { GoogleIcon } from 'src/components/Icons/Google'
import { FacebookIcon } from 'src/components/Icons/Facebook'
import { TwitterIcon } from 'src/components/Icons/Twitter'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'

const CREATE_USER = gql`
  mutation CreateUserMutation(
    $input: CreateUserInput!
    $storeInput: CreateUserStoreInput
  ) {
    createUser(input: $input, storeInput: $storeInput) {
      id
    }
  }
`

const distributors = [
  'Alliance Game Distributors',
  'Prince Wholesalers',
  'ACD Distribution',
  'GTS Distribution',
  'Publisher Services Inc',
  'Lion Rampant',
  'Hit Point Sales',
  'Universal Distribution',
  'Grosnor Distribution Inc',
  'Asmodee',
  'Luma Games',
  'Golden Distribution',
  'ABC Blackfire Distribution',
]

const SignupPage = () => {
  const [error, setError] = React.useState(null)
  const [step, setStep] = React.useState(1)
  const [form, setForm] = React.useState({})
  const [nicknameValid, setNicknameValid] = React.useState(null)
  const [userPicture, setUserPicture] = React.useState({ url: null })
  const { signUp, loading, currentUser } = useAuth()
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER)
  const formMethods = useForm()
  const password = useRef()
  password.current = formMethods.watch('password', '')

  const onSubmit = async (data) => {
    let newData = { ...data, ...form }
    await signUp({ password: newData.password, email: newData.email }).then(
      async () => {
        delete newData.password
        let {
          role,
          email,
          nickname,
          firstname,
          lastname,
          gender,
          phone,
          city,
          state,
          country,
          zip,
          howHeard,
        } = newData

        let variables = {
          input: {
            role,
            nickname,
            email,
            firstname,
            lastname,
            gender,
            phone,
            city,
            state,
            country,
            zip,
            howHeard,
            imageId: userPicture?.id,
          },
        }

        if (role === 'EO') {
          variables.storeInput = {
            name: newData['store-name'],
            email: newData['store-email'],
            phone: newData['store-phone'],
            lat: newData.lat,
            lng: newData.lng,
            street1: newData['formatted_address'],
            city: newData['store-city'],
            country: newData['store-country'],
            state: newData['store-state'],
            zip: newData['store-zip'],
            distributor: newData.distributor,
          }
        }

        await createUser({
          variables,
        }).then(() => {
          setError(null)
          if (role === 'EO') navigate(routes.storePending())
          window.location.reload()
        })
      }
    )
  }

  const onProviderClick = async (provider) => {
    await signUp(provider)
      .then(() => {
        let {
          role,
          email,
          nickname,
          firstname,
          lastname,
          gender,
          phone,
          city,
          state,
          country,
          zip,
          howHeard,
        } = form

        let variables = {
          input: {
            role,
            nickname,
            email,
            firstname,
            lastname,
            gender,
            phone,
            city,
            state,
            country,
            zip,
            howHeard,
          },
        }

        createUser({
          variables,
        })
      })
      .catch(() => {
        toast.error('There was an error in creating your account')
      })
  }

  const selectType = (role) => {
    setForm({
      ...form,
      role,
    })
    setStep(2)
  }

  const addToForm = (data) => {
    setForm({
      ...form,
      ...data,
    })

    setStep(step + 1)
  }

  const onSelectAddress = async (data) => {
    var addr = await getAddress(data.label)
    setForm({
      ...form,
      'store-zip': addr.postal_code,
      'store-country': addr.country,
      'store-city': addr.locality,
      'store-state': addr.administrative_area_level_1,
      lat: addr.lat,
      lng: addr.lng,
      formatted_address: addr.formatted_address,
    })

    formMethods.setValue('store-zip', addr.postal_code)
    formMethods.setValue('store-country', addr.country)
    formMethods.setValue('store-city', addr.locality)
    formMethods.setValue('store-state', addr.administrative_area_level_1)
  }

  useEffect(() => {
    analytics.logEvent('User entered Signup page')
  })

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="flex justify-between">
          <button
            className="w-full py-2 px-4 border rounded-md text-white bg-green-400 hover:bg-green-600"
            onClick={() => selectType('PLAYER')}
          >
            PLAYER
          </button>
          <button
            className="w-full py-2 px-4 border rounded-md text-white bg-green-400 hover:bg-green-600"
            onClick={() => selectType('EO')}
          >
            EVENT ORGANIZER
          </button>
        </div>
      )
    } else if (step === 2) {
      if (form.role === 'PLAYER') {
        return (
          <Form
            onSubmit={(data) => {
              nicknameValid && addToForm(data)
            }}
            className="grid grid-cols-2 gap-4"
            validation={{ mode: 'onBlur' }}
            formMethods={formMethods}
          >
            <FormError error={error} className="col-span-2" />
            <div className="flex flex-col col-span-2">
              <UserPictureSelector
                userPicture={userPicture}
                selectImage={(image) => setUserPicture({ ...image })}
              />
              <span name="firstname">Nickname</span>
              <NicknameCheckField
                onChange={(data) => {
                  setForm({
                    ...form,
                    ...data,
                  })
                }}
                setNicknameValid={setNicknameValid}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="firstname">
                First Name
              </Label>
              <TextField
                name="firstname"
                placeholder="First name"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="lastname">
                Last Name
              </Label>
              <TextField
                name="lastname"
                placeholder="Last name"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="email" errorClassName="text-red-500">
                Email
              </Label>
              <TextField
                name="email"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                  pattern: {
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="phone" errorClassName="text-red-500">
                Phone Number
              </Label>
              <TextField
                name="phone"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="gender" errorClassName="text-red-500">
                Gender
              </Label>
              <TextField
                name="gender"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="dob" errorClassName="text-red-500">
                Date of Birth
              </Label>
              <DateField
                name="dob"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="city" errorClassName="text-red-500">
                City
              </Label>
              <TextField
                name="city"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="state" errorClassName="text-red-500">
                State/Province
              </Label>
              <TextField
                name="state"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="country" errorClassName="text-red-500">
                Country
              </Label>
              <TextField
                name="country"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="zip" errorClassName="text-red-500">
                Zip Code/Postal Code
              </Label>
              <TextField
                name="zip"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <Label name="howHeard">How did you hear about us?</Label>
              <TextAreaField
                name="howHeard"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>

            <Submit
              disabled={!nicknameValid}
              className="col-span-2 my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </Submit>
          </Form>
        )
      } else if (form.role === 'EO') {
        return (
          <Form
            onSubmit={(data) => {
              nicknameValid && addToForm(data)
            }}
            className="grid grid-cols-2 gap-4"
            validation={{ mode: 'onBlur' }}
            formMethods={formMethods}
          >
            <h3 className="col-span-2 mb-4 font-bold underline text-xl">
              Store Owner Information
            </h3>
            <FormError error={error} className="col-span-2" />
            <div className="flex flex-col col-span-2">
              <span name="firstname">Nickname</span>
              <NicknameCheckField
                onChange={(data) => {
                  setForm({
                    ...form,
                    ...data,
                  })
                }}
                setNicknameValid={setNicknameValid}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="firstname">
                First Name
              </Label>
              <TextField
                name="firstname"
                placeholder="First name"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="lastname">
                Last Name
              </Label>
              <TextField
                name="lastname"
                placeholder="Last name"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="email" errorClassName="text-red-500">
                Email
              </Label>
              <TextField
                name="email"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                  pattern: {
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="phone" errorClassName="text-red-500">
                Phone Number
              </Label>
              <TextField
                name="phone"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <Label name="distributor" errorClassName="text-red-500">
                Distributor
              </Label>
              <SelectField
                name="distributor"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue=""
                validation={{
                  required: true,
                  matchesInitialValue: (value) => {
                    return value !== '' || 'Select an Option'
                  },
                }}
              >
                <option disabled value="">
                  Please select an option
                </option>
                {distributors.map((dist) => (
                  <option value={dist} key={`dist-${dist}`}>
                    {dist}
                  </option>
                ))}
              </SelectField>
            </div>
            <h3 className="col-span-2 mb-4 font-bold underline text-xl">
              Store Information
            </h3>
            <div className="flex flex-col w-full col-span-2">
              <Label errorClassName="text-red-500" name="store-name">
                Store Name
              </Label>
              <TextField
                name="store-name"
                placeholder="Store Name"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <Label errorClassName="text-red-500" name="store-address">
                Store Address
              </Label>
              <GooglePlacesAutocomplete
                apiKey={process.env.GOOGLE_API_KEY}
                selectProps={{
                  value: form.address,
                  onChange: onSelectAddress,
                }}
                className="border-2 p-2 mt-2 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-email" errorClassName="text-red-500">
                Email
              </Label>
              <TextField
                name="store-email"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                  pattern: {
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-phone" errorClassName="text-red-500">
                Phone Number
              </Label>
              <TextField
                name="store-phone"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-city" errorClassName="text-red-500">
                Store City
              </Label>
              <TextField
                name="store-city"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-state" errorClassName="text-red-500">
                Store State/Province
              </Label>
              <TextField
                name="store-state"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-country" errorClassName="text-red-500">
                Store Country
              </Label>
              <TextField
                name="store-country"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-zip" errorClassName="text-red-500">
                Store Zip Code/Postal Code
              </Label>
              <TextField
                name="store-zip"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
              />
            </div>

            <Submit className="col-span-2 my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Next
            </Submit>
          </Form>
        )
      }
    } else if (step === 3) {
      return (
        <PasswordCheck
          loading={loading || createUserLoading}
          onSubmit={onSubmit}
          submitText={'Sign Up'}
        />
      )
    }
  }

  if (!currentUser?.user) {
    return (
      <div className="min-h-screen flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="/Logo.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
          {error && <p>{error}</p>}
          {renderStep()}
          {step === 3 && (
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
          )}
        </div>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default SignupPage
