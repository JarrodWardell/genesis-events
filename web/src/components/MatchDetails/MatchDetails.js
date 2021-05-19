import { Form, NumberField, Submit } from '@redwoodjs/forms/dist'
import { useMutation } from '@redwoodjs/web'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'

const SUBMIT_MATCH_DETAILS = gql`
  mutation addMatchScore($input: TournamentMatchScoreInput!) {
    addMatchScore(input: $input) {
      id
    }
  }
`

const MatchDetails = ({ index, match, tournament }) => {
  const [addMatchScore, { loading: addMatchScoreLoading }] = useMutation(
    SUBMIT_MATCH_DETAILS,
    {
      onCompleted: ({ createTournament }) => {
        toast(`Successfully Added Score`)
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
      matchId: match.id,
      matches: [
        {
          userId: match.players[0].user.id,
          playerMatchScore: match.players[0].id,
          score: data.player1,
          result: returnResult(data.player1, data.player2),
        },
        {
          userId: match.players[1].user.id,
          playerMatchScore: match.players[1].id,
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

  const formMethods = useForm()
  const player1 = formMethods.watch('player1', '')
  const player2 = formMethods.watch('player2', '')

  useEffect(() => {}, [player1, player2])

  return (
    <Form onSubmit={onSubmit} formMethods={formMethods}>
      <div className="flex w-full my-4">
        <div>{index + 1}.</div>
        <div className="flex flex-col w-1/4">
          <div>{match.players[0].user?.nickname}</div>
          {!match.players[0].bye && (
            <div>
              {match.players[0].score ? (
                match.players[0].score
              ) : (
                <NumberField
                  className="w-10 rw-input"
                  validation={{ required: true }}
                  name="player1"
                />
              )}
            </div>
          )}
        </div>
        {match.players[0].bye ? (
          <div className="flex flex-col w-1/4">BYE</div>
        ) : (
          <>
            <div className="w-1/3">vs</div>
            <div className="flex flex-col w-1/4">
              <div>{match.players[1].user?.nickname}</div>
              <div>
                {match.players[1].score ? (
                  match.players[1].score
                ) : (
                  <NumberField
                    className="w-10 rw-input"
                    validation={{ required: true }}
                    name="player2"
                  />
                )}
              </div>
            </div>
          </>
        )}
        {(player1 || player2) && (
          <Submit className="rounded-md bg-indigo-300 cursor-pointer hover:bg-indigo-400 px-4">
            Submit
          </Submit>
        )}
      </div>
    </Form>
  )
}

export default MatchDetails
