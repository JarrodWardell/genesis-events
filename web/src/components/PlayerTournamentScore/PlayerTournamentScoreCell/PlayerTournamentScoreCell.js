import PlayerTournamentScore from 'src/components/PlayerTournamentScore/PlayerTournamentScore'

export const QUERY = gql`
  query FindPlayerTournamentScoreById($id: Int!) {
    playerTournamentScore: playerTournamentScore(id: $id) {
      id
      wins
      losses
      score
      playerId
      tournamentId
      createdAt
      updatedAt
      draws
      byes
      randomizer
      active
      wonTournament
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PlayerTournamentScore not found</div>

export const Success = ({ playerTournamentScore }) => {
  return <PlayerTournamentScore playerTournamentScore={playerTournamentScore} />
}