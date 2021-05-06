import { Router, Route, Set, Private } from '@redwoodjs/router'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={[MainLayout]}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/signup/{step}" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Private unauthenticated="login">
          <Route path="/store-pending" page={StorePendingPage} name="storePending" />
          <Route path="/settings" page={SettingsPage} name="settings" />
        </Private>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
