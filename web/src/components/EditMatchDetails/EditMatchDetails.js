import { XIcon } from '@heroicons/react/solid'
import { Form, NumberField } from '@redwoodjs/forms/dist'
import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'

const EditMatchDetails = ({
  index,
  match,
  onSubmit = () => {},
  onCancel = () => {},
  loading,
}) => {
  const formMethods = useForm()
  const player1 = formMethods.watch('player1', '')
  const player2 = formMethods.watch('player2', '')

  return (
    <Form
      onSubmit={onSubmit}
      formMethods={formMethods}
      className="grid grid-cols-12"
    >
      <div className="col-span-1 flex justify-center items-center ">
        {index + 1}.
      </div>
      <div className="col-span-3 flex justify-center items-center">
        <PlayerProfileItem
          player={match?.players[0]?.user || {}}
          playerName={match?.players[0]?.playerName}
        />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        {!match?.players[0]?.bye && (
          <div>
            <NumberField
              className="border border-gray-500 p-2 mt-2 w-14"
              errorClassName="border p-2 mt-2 w-full border-red-500"
              defaultValue={match?.players[0]?.score}
              validation={{ required: true, min: 0 }}
              name="player1"
              min={0}
            />
          </div>
        )}
      </div>
      <div className="col-span-2 flex justify-around items-center"></div>
      {match?.players.length > 1 ? (
        <>
          <div className="col-span-1 flex justify-center items-center">
            <NumberField
              className="border border-gray-500 p-2 mt-2 w-14"
              errorClassName="border p-2 mt-2 w-full border-red-500"
              defaultValue={match?.players[1]?.score}
              validation={{ required: true, min: 0 }}
              name="player2"
              min={0}
            />
          </div>
          <div className="col-span-3 flex justify-center items-center">
            <PlayerProfileItem
              player={match?.players[1]?.user || {}}
              playerName={match?.players[1]?.playerName}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-1 flex justify-center items-center"></div>
          <div className="col-span-3 flex justify-center items-center"></div>
        </>
      )}

      <div className="col-span-1 flex justify-around items-center">
        <Button
          loading={loading}
          onClick={onCancel}
          className="rounded-full"
          my="0"
          py="2"
          px="2"
          full={false}
          color="red"
        >
          <XIcon className="h-6 w-6 text-white" />
        </Button>
        {player1 !== match?.players[0]?.score ||
          player2 !== match?.players[1]?.score}
        <Button
          type="submit"
          loading={loading}
          className="rounded-full"
          my="0"
          py="2"
          px="2"
          full={false}
          colorWeight={400}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </Button>
      </div>
    </Form>
  )
}

export default EditMatchDetails
