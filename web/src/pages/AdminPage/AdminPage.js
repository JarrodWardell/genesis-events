import { Link, routes } from '@redwoodjs/router'

const AdminPage = () => {
  return (
    <>
      <h1>AdminPage</h1>
      <p>
        Find me in <code>./web/src/pages/AdminPage/AdminPage.js</code>
      </p>
      <p>
        My default route is named <code>admin</code>, link to me with `
        <Link to={routes.admin()}>Admin</Link>`
      </p>
    </>
  )
}

export default AdminPage
