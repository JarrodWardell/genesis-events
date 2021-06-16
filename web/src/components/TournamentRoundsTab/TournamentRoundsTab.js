import { useAuth } from '@redwoodjs/auth'
import { navigate, Redirect } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { calcNumRounds } from 'src/helpers/tournamentHelper'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import MatchDetails from '../MatchDetails/MatchDetails'
import TournamentNotStarted from '../TournamentNotStarted/TournamentNotStarted'

export const ADVANCE_ROUND = gql`
  mutation advanceRound($id: Int!, $roundNumber: Int!) {
    advanceRound: advanceRound(id: $id, roundNumber: $roundNumber) {
      id
      round {
        roundNumber
      }
    }
  }
`

export const END_TOURNAMENT = gql`
  mutation endTournament($id: Int!) {
    endTournament: endTournament(id: $id) {
      id
    }
  }
`

const TournamentRoundsTab = ({ tournament, roundNumber }) => {
  if ((!roundNumber || roundNumber === '') && tournament.round.length) {
    return (
      <Redirect
        to={`/tournament/${tournament?.tournamentUrl}/rounds/${
          tournament?.round[tournament.round.length - 1].roundNumber
        }`}
      />
    )
  }

  const [
    advanceRound,
    { loading: loadingAdvanceRound, error: errorAdvanceRound },
  ] = useMutation(ADVANCE_ROUND, {
    onCompleted: (data) => {
      const newRound =
        data.advanceRound?.round[data.advanceRound?.round?.length - 1]
          ?.roundNumber
      toast.success(`Tournament has advanced to round ${newRound}`)
      navigate(`/tournament/${tournament?.tournamentUrl}/rounds/${newRound}`)
    },
    refetchQueries: [
      {
        query: TOURNAMENT_BY_URL,
        variables: { url: tournament.tournamentUrl },
      },
    ],
  })

  const [
    endTournament,
    { loading: loadingEndTournament, error: errorEndTournament },
  ] = useMutation(END_TOURNAMENT, {
    onCompleted: (data) => {
      toast.success(`Tournament has ended!`)
    },
    refetchQueries: [
      {
        query: TOURNAMENT_BY_URL,
        variables: { url: tournament.tournamentUrl },
      },
    ],
  })

  if (!tournament.dateStarted) {
    return <TournamentNotStarted tournament={tournament} />
  }

  const grabRound = () => {
    let round = {}

    tournament.round.map((rnd) => {
      if (rnd.roundNumber === roundNumber) {
        round = { ...rnd }
      }
    })

    return round
  }

  const renderRound = () => {
    let round = grabRound()
    let matches = []

    if (round?.matches) {
      round.matches.map((match, index) => {
        matches.push(
          <MatchDetails match={match} index={index} tournament={tournament} />
        )
      })
    }

    return matches
  }

  const checkScoresSubmitted = () => {
    let round = grabRound()
    let scoresSubmitted = true

    round.matches.forEach((match) => {
      match.players.forEach((player) => {
        if (!player.score && !player.bye) {
          scoresSubmitted = false
        }
      })
    })

    return scoresSubmitted
  }

  return (
    <div className="w-full">
      <h2>{'Rounds'}</h2>
      <div className="flex w-full my-4">
        {tournament.round?.map((round) => {
          return (
            <div
              key={round.id}
              onClick={() =>
                navigate(
                  `/tournament/${tournament?.tournamentUrl}/rounds/${round.roundNumber}`
                )
              }
              className={
                'py-4 px-8 w-20 border-gray-100 border-2 cursor-pointer hover:bg-blue-500' +
                (round.roundNumber === roundNumber ? ' bg-blue-300' : '')
              }
            >
              {round.roundNumber}
            </div>
          )
        })}
      </div>
      <div className="w-full flex flex-col">{renderRound()}</div>
      {calcNumRounds(tournament.players.length) > grabRound().roundNumber &&
      tournament.round.length === grabRound().roundNumber ? (
        <button
          disabled={!checkScoresSubmitted() || loadingAdvanceRound}
          onClick={() => {
            advanceRound({
              variables: {
                id: tournament.id,
                roundNumber: grabRound().roundNumber + 1,
              },
            })
          }}
        >
          Advance to next round
        </button>
      ) : (
        calcNumRounds(tournament.players.length) ===
          grabRound().roundNumber && (
          <button
            disabled={!checkScoresSubmitted() || loadingEndTournament}
            onClick={() => endTournament({ variables: { id: tournament.id } })}
          >
            End Tournament
          </button>
        )
      )}
    </div>
  )
}

export default TournamentRoundsTab
