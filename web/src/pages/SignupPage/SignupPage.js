import {
  Form,
  TextField,
  PasswordField,
  Submit,
  Label,
  DateField,
  TextAreaField,
  FormError,
  SelectField,
} from '@redwoodjs/forms'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { Redirect } from '@redwoodjs/router'

import NicknameCheckField from 'src/components/NicknameCheckField/NicknameCheckField'
import { getAddress } from 'src/helpers/formatAddress'

const CREATE_USER = gql`
  mutation CreateUserMutation(
    $input: CreateUserInput!
    $storeInput: CreateStoreInput
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
  const { signUp, loading, currentUser } = useAuth()
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER)
  const formMethods = useForm()
  const password = useRef()
  password.current = formMethods.watch('password', '')
  const onSubmit = async (data) => {
    let newData = { ...data, ...form }
    await signUp({ password: newData.password, email: newData.email })

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
      },
    }

    if (role === 'EO') {
      variables.storeInput = {
        name: newData['store-name'],
        email: newData['store-email'],
        phone: newData['store-phone'],
        lat: newData.lng,
        lng: newData.lat,
        street1: newData['formatted_address'],
        city: newData['store-city'],
        country: newData['store-country'],
        state: newData['store-state'],
        zip: newData['store-zip'],
        distributor: newData.distributor,
      }
    }

    createUser({
      variables,
    })
    setError(null)
  }

  const onProviderClick = async (provider) => {
    await signUp(provider)

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

  useEffect(() => {})

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
        <Form
          onSubmit={onSubmit}
          className="flex flex-col"
          validation={{ mode: 'onBlur' }}
        >
          <Label name="password" errorClassName="text-red-500">
            Password
          </Label>
          <PasswordField
            name="password"
            placeholder="Password"
            className="border-2 p-2 mt-2 mb-4"
            errorClassName="border-2 p-2 mt-2 w-full border-red-500 mb-4"
            validation={{
              required: true,
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            }}
          />
          <Submit
            disabled={loading || createUserLoading}
            className="my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </Submit>
        </Form>
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
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
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
