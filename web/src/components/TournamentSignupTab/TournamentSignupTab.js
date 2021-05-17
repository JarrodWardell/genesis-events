import { useAuth } from '@redwoodjs/auth'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'

export const REGISTER_TOURNAMENT = gql`
  mutation registerForTournament($id: Int!) {
    registerForTournament: registerForTournament(id: $id)
  }
`

const TournamentSignupTab = ({ tournament }) => {
  const { currentUser, hasRole } = useAuth()
  const [registerForTournament, { loading, error }] = useMutation(
    REGISTER_TOURNAMENT,
    {
      onCompleted: () => {
        toast.success('Successfully Registered for Tournament')
        navigate(`/tournament/${tournament.tournamentUrl}/rounds`)
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament.tournamentUrl },
        },
      ],
    }
  )

  //Check if applicable to register
  const isInTournament = () => {
    console.log(tournament.players)
    var playerList = {}
    tournament.players?.forEach(
      ({ player }) => (playerList[player.id] = { ...player })
    )

    console.log(playerList)

    if (playerList && currentUser.user.id in playerList) {
      return false
    }

    return true
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl">
        Sign Up For <strong>{tournament.name}</strong> Tournament
      </h2>
      {hasRole('PLAYER') ? (
        tournament.dateStarted ? (
          <h1 className="text-center text-lg">
            This tournament has already started
          </h1>
        ) : tournament.players.length >= tournament.maxPlayers ? (
          <h1 className="text-center text-lg">
            Sorry this tournament is full! Please contact the Event Organizer if
            you would like to participate
          </h1>
        ) : isInTournament() ? (
          <>
            <button
              className="border-green-100 border-2 py-5 px-10 text-center hover:bg-blue-400 cursor-pointer"
              onClick={() =>
                registerForTournament({ variables: { id: tournament.id } })
              }
              disabled={loading}
            >
              <h2 className="text-center text-lg">Register now!</h2>
            </button>
          </>
        ) : (
          <h1 className="text-center text-lg">
            You have already signed up for this tournament!
          </h1>
        )
      ) : (
        <h1 className="text-center text-lg">
          Only players may register to sign up for tournaments
        </h1>
      )}
    </div>
  )
}

export default TournamentSignupTab
