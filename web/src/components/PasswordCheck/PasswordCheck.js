import { Form, Label, PasswordField, Submit } from '@redwoodjs/forms/dist'
import { useForm } from 'react-hook-form'

const PasswordCheck = ({
  onSubmit,
  loading = false,
  submitText = 'Sign Up',
  showOldPasswordField = false,
  onBack = () => {},
  backButtonText = null,
}) => {
  const formMethods = useForm()
  const password = formMethods.watch('password', '')
  const confirmPassword = formMethods.watch('confirm_password', '')

  const passwordRuleDiv = ({
    ruleFunction = () => {},
    text,
    checkConfirmPassword = false,
  }) => {
    let bgColor = 'bg-gray-300'
    let textColor = 'text-gray-400'
    if (
      password.length > 0 &&
      (!checkConfirmPassword || confirmPassword.length > 0)
    ) {
      if (ruleFunction(password)) {
        bgColor = 'bg-green-300'
        textColor = 'text-black-400'
      } else {
        bgColor = 'bg-red-300'
        textColor = 'text-black-400'
      }
    }

    return (
      <div className={`rounded-md px-2 text-sm ${bgColor} ${textColor}`}>
        {text}
      </div>
    )
  }

  const checkPasswordRules = () => {
    if (
      passwordContainsUpperCase(password) &&
      passwordContainsNumber(password) &&
      passwordContainsLowercase(password) &&
      passwordContainsSymbol(password) &&
      password === confirmPassword
    ) {
      return true
    }

    return false
  }

  const passwordContainsUpperCase = (value) => {
    if (/.*[A-Z]/.test(value)) {
      return true
    }

    return false
  }

  const passwordContainsNumber = (value) => {
    if (/.*\d/.test(value)) {
      return true
    }

    return false
  }

  const passwordContainsLowercase = (value) => {
    if (/.*[a-z]/.test(value)) {
      return true
    }

    return false
  }

  const passwordContainsSymbol = (value) => {
    if (/.*\W+/.test(value)) {
      return true
    }

    return false
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex flex-col"
      validation={{ mode: 'onBlur' }}
      formMethods={formMethods}
    >
      {showOldPasswordField && (
        <>
          <Label name="currentPassword" errorClassName="text-red-500">
            Current Password
          </Label>
          <PasswordField
            name="currentPassword"
            placeholder="Current Password"
            className="border-2 p-2 mt-2 mb-4"
            errorClassName="border-2 p-2 mt-2 w-full border-red-500 mb-4"
            validation={{
              required: true,
            }}
          />
        </>
      )}
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
      <div className="flex my-4 w-full justify-between sm:flex-wrap md:flex-nowrap">
        {passwordRuleDiv({
          text: '1 lower case letter',
          ruleFunction: passwordContainsLowercase,
        })}
        {passwordRuleDiv({
          text: '1 number',
          ruleFunction: passwordContainsNumber,
        })}
        {passwordRuleDiv({
          text: '1 special character',
          ruleFunction: passwordContainsSymbol,
        })}
        {passwordRuleDiv({
          text: '1 uppercase letter',
          ruleFunction: passwordContainsUpperCase,
        })}
      </div>
      <Label name="confirm_password" errorClassName="text-red-500">
        Confirm Password
      </Label>
      <PasswordField
        name="confirm_password"
        placeholder="Confirm Password"
        className="border-2 p-2 mt-2 mb-4"
        errorClassName="border-2 p-2 mt-2 w-full border-red-500 mb-4"
        validation={{
          required: true,
          validate: (value) =>
            value === password || 'The passwords do not match',
        }}
      />
      <div className="flex my-4 w-full justify-between sm:flex-wrap md:flex-nowrap">
        {passwordRuleDiv({
          text: 'Password Match',
          ruleFunction: (value) => value === confirmPassword,
        })}
      </div>

      <div className="grid gap-x-4 grid-cols-2">
        {backButtonText && (
          <button
            className="my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={onBack}
          >
            {backButtonText}
          </button>
        )}
        <Submit
          disabled={loading || !checkPasswordRules()}
          className="my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {submitText}
        </Submit>
      </div>
    </Form>
  )
}

export default PasswordCheck
