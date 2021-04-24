import { Link, routes } from '@redwoodjs/router'

const ResetPasswordPage = () => {
  return (
    <>
      <h1>ResetPasswordPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ResetPasswordPage/ResetPasswordPage.js</code>
      </p>
      <p>
        My default route is named <code>resetPassword</code>, link to me with `
        <Link to={routes.resetPassword()}>ResetPassword</Link>`
      </p>
    </>
  )
}

export default ResetPasswordPage
