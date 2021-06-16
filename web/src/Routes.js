import { Router, Route, Set, Private } from '@redwoodjs/router'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/users/new" page={NewUserPage} name="newUser" />
      <Route path="/users/{id}/edit" page={EditUserPage} name="editUser" />
      <Route path="/users/{id}" page={UserPage} name="user" />
      <Route path="/users" page={UsersPage} name="users" />
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={[MainLayout]}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/signup/{step}" page={SignupPage} name="signup" />
        <Route path="/user-contact" page={UserContactPage} name="userContact" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/tournament/{url}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/tournament/{url}/{tab}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/tournament/{url}/{tab}/{tabOptions:Int}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/search" page={TournamentSearchPage} name="tournamentSearch" />
        <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
        <Private unauthenticated="login">
          <Route path="/settings" page={SettingsPage} name="settings" />
          <Route path="/settings/{tab:String}" page={SettingsPage} name="settings" />
        </Private>
        <Private unauthenticated="login" role="EO">
          <Route path="/store-pending" page={StorePendingPage} name="storePending" />
        </Private>
        <Private unauthenticated="login" role={['EO', 'ADMIN']}>
          <Route path="/create-tournament" page={CreateTournamentPage} name="createTournament" />
          <Route path="/edit-tournament/{url}" page={EoEditTournamentPage} name="eoEditTournament" />
        </Private>
        <Private unauthenticated="login" role="ADMIN">
          <Route path="/admin" page={AdminPage} name="admin" />
          <Route path="/admin/stores/new" page={NewStorePage} name="newStore" />
          <Route path="/admin/stores/{id}/edit" page={EditStorePage} name="editStore" />
          <Route path="/admin/stores/{id}" page={StorePage} name="store" />
          <Route path="/admin/stores" page={StoresPage} name="stores" />
          <Route path="/admin/tournaments/new" page={NewTournamentPage} name="newTournament" />
          <Route path="/admin/tournaments/{id:Int}/edit" page={EditTournamentPage} name="editTournament" />
          <Route path="/admin/tournaments/{id:Int}" page={TournamentPage} name="tournament" />
          <Route path="/admin/tournaments" page={TournamentsPage} name="tournaments" />
          <Route path="/admin/banners/new" page={NewBannerPage} name="newBanner" />
          <Route path="/admin/banners/{id:Int}/edit" page={EditBannerPage} name="editBanner" />
          <Route path="/admin/banners/{id:Int}" page={BannerPage} name="banner" />
          <Route path="/admin/banners" page={BannersPage} name="banners" />
          <Route path="/admin/user-pictures/new" page={NewUserPicturePage} name="newUserPicture" />
          <Route path="/admin/user-pictures/{id:Int}/edit" page={EditUserPicturePage} name="editUserPicture" />
          <Route path="/admin/user-pictures/{id:Int}" page={UserPicturePage} name="userPicture" />
          <Route path="/admin/user-pictures" page={UserPicturesPage} name="userPictures" />
          <Route path="/admin/contacts/new" page={NewContactPage} name="newContact" />
          <Route path="/admin/contacts/{id:Int}/edit" page={EditContactPage} name="editContact" />
          <Route path="/admin/contacts/{id:Int}" page={ContactPage} name="contact" />
          <Route path="/admin/contacts" page={ContactsPage} name="contacts" />
        </Private>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
