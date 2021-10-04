import { PencilIcon } from '@heroicons/react/solid'
import { useAuth } from '@redwoodjs/auth'
import { Form, NumberField, Submit } from '@redwoodjs/forms/dist'
import { useMutation } from '@redwoodjs/web'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { logError } from 'src/helpers/errorLogger'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import Button from '../Button/Button'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'

const SUBMIT_MATCH_DETAILS = gql`
  mutation addMatchScore($input: TournamentMatchScoreInput!) {
    addMatchScore(input: $input) {
      id
    }
  }
`

const UPDATE_MATCH_DETAILS = gql`
  mutation updateMatchScore($input: TournamentMatchScoreInput!) {
    updateMatchScore(input: $input) {
      id
    }
  }
`

const MatchDetails = ({ index, match, tournament }) => {
  const { currentUser, hasRole } = useAuth()
  const [edit, setEdit] = React.useState(false)
  const [addedScore, setAddedScore] = React.useState(false)

  const [addMatchScore, { loading: addMatchScoreLoading }] = useMutation(
    SUBMIT_MATCH_DETAILS,
    {
      onCompleted: () => {
        toast.success(`Successfully Added Score`)
        setAddedScore(true)
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament.tournamentUrl },
        },
      ],
    }
  )

  const [updateMatchScore, { loading: updateMatchScoreLoading }] = useMutation(
    UPDATE_MATCH_DETAILS,
    {
      onCompleted: () => {
        toast.success(`Successfully Updated Score`)
        setAddedScore(true)
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament.tournamentUrl },
        },
      ],
    }
  )

  const onSubmit = (data) => {
    let input = {
      matchId: match?.id,
      matches: [
        {
          userId: match?.players[0]?.user?.id,
          playerName: match?.players[0]?.playerName,
          playerMatchScore: match?.players[0]?.id,
          score: data.player1,
          result: returnResult(data.player1, data.player2),
        },
        {
          userId: match?.players[1]?.user?.id,
          playerMatchScore: match?.players[1]?.id,
          playerName: match?.players[1]?.playerName,
          score: data.player2,
          result: returnResult(data.player2, data.player1),
        },
      ],
    }
    addMatchScore({ variables: { input } })
  }

  const returnResult = (currPlayer, otherPlayer) => {
    if (currPlayer > otherPlayer) {
      return 'WIN'
    } else if (currPlayer === otherPlayer) {
      return 'TIED'
    } else {
      return 'LOSS'
    }
  }

  const returnIcons = () => {
    let icons = []

    if (match?.players[0]?.score === 0 || match?.players[0]?.score >= 1) {
      let result = returnResult(
        match?.players[0]?.score,
        match?.players[1]?.score
      )
      if (result === 'WIN') {
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 text-white flex justify-center items-center">
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
        )
      } else if (result === 'LOSS') {
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 text-white flex justify-center items-center">
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )
      } else if (result === 'TIED') {
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 flex justify-center items-center text-white mr-2">
            {' '}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
        )
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 flex justify-center items-center text-white ">
            {' '}
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )
      }
    } else {
      icons.push(<div className="rounded-full bg-gray-900 w-10 h-10"></div>)
    }

    return icons
  }

  const scoreSubmitted = (playerScore) => {
    if (playerScore === 0 || playerScore >= 1) {
      return true
    }

    return false
  }

  const formMethods = useForm()
  const player1 = formMethods.watch('player1', '')
  const player2 = formMethods.watch('player2', '')

  useEffect(() => {}, [player1, player2])

  return (
    <div className="col-span-12 border-b border-black pb-2 w-full">
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
              {scoreSubmitted(match?.players[0]?.score) ? (
                <div
                  className={`rounded-full flex justify-center items-center h-8 w-8 ${
                    returnResult(
                      match?.players[0]?.score,
                      match?.players[1]?.score
                    ) === 'WIN'
                      ? 'bg-green-300'
                      : returnResult(
                          match?.players[0]?.score,
                          match?.players[1]?.score
                        ) === 'LOSS'
                      ? 'bg-red-300'
                      : 'bg-yellow-200'
                  }`}
                >
                  {match?.players[0]?.score}
                </div>
              ) : (
                checkTournamentPermissions({
                  hasRole,
                  currentUser,
                  tournament,
                }) && (
                  <NumberField
                    className="border border-gray-500 p-2 mt-2 w-14"
                    errorClassName="border p-2 mt-2 w-full border-red-500"
                    validation={{ required: true, min: 0 }}
                    name="player1"
                    min={0}
                  />
                )
              )}
            </div>
          )}
        </div>
        <div className="col-span-2 flex justify-center items-center">
          {match?.players[0]?.bye ? <div>BYE</div> : returnIcons()}
        </div>
        {match?.players.length > 1 && (
          <>
            <div className="col-span-1 flex justify-center items-center">
              {scoreSubmitted(match?.players[1]?.score) ? (
                <div
                  className={`rounded-full flex justify-center items-center h-8 w-8 ${
                    returnResult(
                      match?.players[1]?.score,
                      match?.players[0]?.score
                    ) === 'WIN'
                      ? 'bg-green-300'
                      : returnResult(
                          match?.players[1]?.score,
                          match?.players[0]?.score
                        ) === 'LOSS'
                      ? 'bg-red-300'
                      : 'bg-yellow-200'
                  }`}
                >
                  {match?.players[1]?.score}
                </div>
              ) : (
                checkTournamentPermissions({
                  hasRole,
                  currentUser,
                  tournament,
                }) && (
                  <NumberField
                    className="border border-gray-500 p-2 mt-2 w-14"
                    errorClassName="border p-2 mt-2 w-full border-red-500"
                    validation={{ required: true, min: 0 }}
                    name="player2"
                    min={0}
                  />
                )
              )}
            </div>
            <div className="col-span-3 flex justify-center items-center">
              <PlayerProfileItem
                player={match?.players[1]?.user || {}}
                playerName={match?.players[1]?.playerName}
              />
            </div>
          </>
        )}

        <div className="col-span-1 flex justify-center items-center">
          {scoreSubmitted(match?.players[0]?.score) &&
            checkTournamentPermissions({
              hasRole,
              currentUser,
              tournament,
            }) &&
            !edit && (
              <Button
                type="submit"
                loading={addMatchScoreLoading}
                className="rounded-full"
                color={'blue'}
                my="0"
                py="2"
                px="2"
                full={false}
                colorWeight={400}
              >
                <PencilIcon className="h-6 w-6" />
              </Button>
            )}
          {!addedScore &&
            player1 &&
            player2 &&
            !scoreSubmitted(match?.players[0]?.score) && (
              <Button
                type="submit"
                loading={addMatchScoreLoading}
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
            )}
        </div>
      </Form>
    </div>
  )
}

export default MatchDetails
