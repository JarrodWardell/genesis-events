import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/TournamentsCell'

const DELETE_TOURNAMENT_MUTATION = gql`
  mutation DeleteTournamentMutation($id: Int!) {
    deleteTournament(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Tournament = ({ tournament }) => {
  const [deleteTournament] = useMutation(DELETE_TOURNAMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Tournament deleted')
      navigate(routes.tournaments())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete tournament ' + id + '?')) {
      deleteTournament({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Tournament {tournament.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{tournament.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{tournament.name}</td>
            </tr>
            <tr>
              <th>Tournament url</th>
              <td>{tournament.tournamentUrl}</td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>{timeTag(tournament.startDate)}</td>
            </tr>
            <tr>
              <th>Date started</th>
              <td>{timeTag(tournament.dateStarted)}</td>
            </tr>
            <tr>
              <th>Date ended</th>
              <td>{timeTag(tournament.dateEnded)}</td>
            </tr>
            <tr>
              <th>Max players</th>
              <td>{tournament.maxPlayers}</td>
            </tr>
            <tr>
              <th>Time left in seconds</th>
              <td>{tournament.timeLeftInSeconds}</td>
            </tr>
            <tr>
              <th>Location name</th>
              <td>{tournament.locationName}</td>
            </tr>
            <tr>
              <th>Info url</th>
              <td>{tournament.infoUrl}</td>
            </tr>
            <tr>
              <th>Street1</th>
              <td>{tournament.street1}</td>
            </tr>
            <tr>
              <th>Street2</th>
              <td>{tournament.street2}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{tournament.city}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{tournament.country}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{tournament.state}</td>
            </tr>
            <tr>
              <th>Zip</th>
              <td>{tournament.zip}</td>
            </tr>
            <tr>
              <th>Lat</th>
              <td>{tournament.lat}</td>
            </tr>
            <tr>
              <th>Lng</th>
              <td>{tournament.lng}</td>
            </tr>
            <tr>
              <th>Winner id</th>
              <td>{tournament.winnerId}</td>
            </tr>
            <tr>
              <th>Store id</th>
              <td>{tournament.storeId}</td>
            </tr>
            <tr>
              <th>Owner id</th>
              <td>{tournament.ownerId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(tournament.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(tournament.updatedAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{tournament.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTournament({ id: tournament.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(tournament.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Tournament
