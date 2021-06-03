import { Router, Route, Set, Private } from '@redwoodjs/router'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={[MainLayout]}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/tournament/{url}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/tournament/{url}/{tab}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/tournament/{url}/{tab}/{tabOptions:Int}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/signup/{step}" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Private unauthenticated="login">
          <Route path="/settings" page={SettingsPage} name="settings" />
        </Private>
        <Private unauthenticated="login" role="EO">
          <Route path="/store-pending" page={StorePendingPage} name="storePending" />
        </Private>
        <Private unauthenticated="login" role={['EO', 'ADMIN']}>
          <Route path="/create-tournament" page={CreateTournamentPage} name="createTournament" />
          <Route path="/edit-tournament/{url}" page={EoEditTournamentPage} name="eoEditTournament" />
        </Private>
        <Private unauthenticated="login" role="ADMIN">
          <Route path="/admin/tournaments/new" page={NewTournamentPage} name="newTournament" />
          <Route path="/stores/new" page={NewStorePage} name="newStore" />
          <Route path="/stores/{id}/edit" page={EditStorePage} name="editStore" />
          <Route path="/stores/{id}" page={StorePage} name="store" />
          <Route path="/stores" page={StoresPage} name="stores" />
          <Route path="/tournaments/{id:Int}/edit" page={EditTournamentPage} name="editTournament" />
          <Route path="/tournaments/{id:Int}" page={TournamentPage} name="tournament" />
          <Route path="/tournaments" page={TournamentsPage} name="tournaments" />
        </Private>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
