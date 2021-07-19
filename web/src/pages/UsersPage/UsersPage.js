import UsersLayout from 'src/layouts/UsersLayout'
import UsersCell from 'src/components/UsersCell'

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <UsersLayout>
      <input
        className="rounded-md w-full my-2 border-2 p-2 rounded-md text-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Firstname, Lastname, Nickname or Email"
      />
      <UsersCell searchTerm={searchTerm} />
    </UsersLayout>
  )
}

export default UsersPage
