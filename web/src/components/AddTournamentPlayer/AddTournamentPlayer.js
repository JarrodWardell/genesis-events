import CreatableSelect from 'react-select/creatable'
import { CheckIcon, PlusCircleIcon, XIcon } from '@heroicons/react/solid'
import Button from '../Button/Button'

const AddTournamentPlayer = ({
  playerList = [],
  onSubmit = () => {},
  loading,
  columns = ['wins', 'draws', 'byes', 'losses', 'score'],
  columnClasses = 'text-center py-2',
}) => {
  const defaultForm = {
    playerName: '',
    userId: null,
    wins: 0,
    draws: 0,
    losses: 0,
    byes: 0,
    score: 0.0,
  }

  const [form, setForm] = React.useState({
    ...defaultForm,
  })

  const createDummy = (value) => {
    setForm({
      ...defaultForm,
      playerName: value,
    })
  }

  const selectUser = (value) => {}

  return (
    <tr className="text-center py-2 border-black border-b-2 text-gray-900 text-sm mb-2">
      <td className={columnClasses}>
        <div className="flex justify-center">
          <PlusCircleIcon className="h-8 w-8 text-green-700" />
        </div>
      </td>
      <td className={columnClasses}>
        <CreatableSelect
          onCreateOption={createDummy}
          onChange={selectUser}
          className="w-full rounded-md shadow-sm"
          errorClassName="border-2 p-2 mt-2 w-full rounded-md shadow-sm border-red-500"
          value={{
            value: form.playerName,
            label: form.playerName,
          }}
          options={playerList}
        />
      </td>
      {columns.map((column) => (
        <td className={columnClasses} key={`add-player-${column}`}>
          <input
            value={form[column]}
            name={form[column]}
            onChange={({ target }) => {
              setForm({ ...form, [column]: target?.value })
            }}
            className="w-12 border-2 p-2"
          />
        </td>
      ))}
      <td className="text-center py-2">
        {form.playerName && (
          <div className="flex justify-around">
            <Button
              color="red"
              disabled={loading}
              full={false}
              className="rounded-full w-8 h-8 justify-center items-center"
              px={1}
              py={1}
              my={0}
              onClick={() => {
                if (confirm('Are you sure you would like to reset the form?')) {
                  setForm({
                    ...defaultForm,
                  })
                }
              }}
            >
              <XIcon className="h-8 w-8 text-white" />
            </Button>
            <Button
              color="green"
              disabled={loading}
              full={false}
              px={1}
              py={1}
              my={0}
              className="rounded-full w-8 h-8 justify-center items-center"
              onClick={() => onSubmit(form)}
            >
              <CheckIcon className="h-8 w-8 text-white" />
            </Button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default AddTournamentPlayer
