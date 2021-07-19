import TournamentsLayout from 'src/layouts/TournamentsLayout'
import TournamentsCell from 'src/components/TournamentsCell'

const TournamentsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <TournamentsLayout>
      <input
        className="rounded-md w-full my-2 border-2 p-2 rounded-md text-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Tournament Name, Url, Location Name, or Street1"
      />
      <TournamentsCell searchTerm={searchTerm} />
    </TournamentsLayout>
  )
}

export default TournamentsPage
