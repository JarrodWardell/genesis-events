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

export const Empty = () => <div />

export const Success = ({ myTournaments }) => {
  return (
    <div className="my-8">
      <h1 className="text-xl text-black mb-4">Registered Tournaments</h1>
      {myTournaments.map((tournament, index) => (
        <TournamentItem
          tournament={tournament}
          key={tournament.id}
          index={index}
          full={true}
        />
      ))}
    </div>
  )
}
