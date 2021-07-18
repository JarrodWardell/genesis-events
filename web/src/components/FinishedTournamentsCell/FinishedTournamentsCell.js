import { CORE_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import TournamentItem from '../TournamentItem/TournamentItem'

export const QUERY = gql`
  ${CORE_TOURNAMENT_FIELDS}
  query FinishedTournamentsQuery {
    finishedTournaments {
      ...CoreTournamentFields
    }
  }
`

export const Loading = () => <div />

export const Empty = () => <div>No Finished Tournaments Found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ finishedTournaments }) => {
  return finishedTournaments.map((tournament, index) => (
    <TournamentItem
      tournament={tournament}
      key={tournament.id}
      index={index}
      full={false}
    />
  ))
}
