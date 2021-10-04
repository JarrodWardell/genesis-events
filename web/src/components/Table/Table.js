const Table = ({
  //Columns should be an array of objects, with the name, key, and type
  columns = [],
  onSort = () => {},
  //Actions should be an array of objects with a name, function, and type
  actions = [],
  //Object to search through
  dataObj = [],
}) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name}>{col.name}</th>
            ))}

            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {dataObj.map((item) => (
            <tr key={item.id}>
              {columns.map(({ key }) => (
                <td key={key}>{item[key]}</td>
              ))}
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

export default Table
