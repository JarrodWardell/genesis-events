import { CORE_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import TournamentItem from '../TournamentItem/TournamentItem'

export const QUERY = gql`
  ${CORE_TOURNAMENT_FIELDS}
  query MyTournamentsQuery {
    myTournaments {
      ...CoreTournamentFields
    }
  }
`

export const Loading = () => <div />

export const Success = ({ myTournaments }) => {
  return myTournaments.map((tournament, index) => (
    <TournamentItem
      tournament={tournament}
      key={tournament.id}
      index={index}
      full={true}
    />
  ))
}
