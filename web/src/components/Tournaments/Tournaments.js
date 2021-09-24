import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/TournamentsCell'

const DELETE_TOURNAMENT_MUTATION = gql`
  mutation DeleteTournamentMutation($id: Int!) {
    deleteTournament(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {datetime ? new Date(datetime).toUTCString() : ''}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TournamentsList = ({ tournaments }) => {
  const [deleteTournament] = useMutation(DELETE_TOURNAMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Tournament deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete tournament ' + id + '?')) {
      deleteTournament({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Tournament url</th>
            <th>Start date</th>
            <th>Type</th>
            <th>Date started</th>
            <th>Date ended</th>
            <th>Max players</th>
            <th>Location name</th>
            <th>Info url</th>
            <th>Street1</th>
            <th>Street2</th>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Zip</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Store id</th>
            <th>Owner id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Desc</th>
            <th>Active</th>
            <th>Starting timer in seconds</th>
            <th>Timer left in seconds</th>
            <th>Timer status</th>
            <th>Timer last updated</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{truncate(tournament.id)}</td>
              <td>{truncate(tournament.name)}</td>
              <td>{truncate(tournament.tournamentUrl)}</td>
              <td>{timeTag(tournament.startDate)}</td>
              <td>{truncate(tournament.type)}</td>
              <td>{timeTag(tournament.dateStarted)}</td>
              <td>{timeTag(tournament.dateEnded)}</td>
              <td>{truncate(tournament.maxPlayers)}</td>
              <td>{truncate(tournament.locationName)}</td>
              <td>{truncate(tournament.infoUrl)}</td>
              <td>{truncate(tournament.street1)}</td>
              <td>{truncate(tournament.street2)}</td>
              <td>{truncate(tournament.city)}</td>
              <td>{truncate(tournament.country)}</td>
              <td>{truncate(tournament.state)}</td>
              <td>{truncate(tournament.zip)}</td>
              <td>{truncate(tournament.lat)}</td>
              <td>{truncate(tournament.lng)}</td>
              <td>{truncate(tournament.storeId)}</td>
              <td>{truncate(tournament.ownerId)}</td>
              <td>{timeTag(tournament.createdAt)}</td>
              <td>{timeTag(tournament.updatedAt)}</td>
              <td>{truncate(tournament.desc)}</td>
              <td>{checkboxInputTag(tournament.active)}</td>
              <td>{truncate(tournament.startingTimerInSeconds)}</td>
              <td>{truncate(tournament.timerLeftInSeconds)}</td>
              <td>{truncate(tournament.timerStatus)}</td>
              <td>{timeTag(tournament.timerLastUpdated)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.tournament({ id: tournament.id })}
                    title={'Show tournament ' + tournament.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTournament({ id: tournament.id })}
                    title={'Edit tournament ' + tournament.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete tournament ' + tournament.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(tournament.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TournamentsList
