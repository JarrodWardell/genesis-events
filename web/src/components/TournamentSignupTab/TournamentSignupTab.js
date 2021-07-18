import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import Button from '../Button/Button'
import { FacebookIcon } from '../Icons/Facebook'
import { TwitterIcon } from '../Icons/Twitter'

export const REGISTER_TOURNAMENT = gql`
  mutation registerForTournament($id: Int!) {
    registerForTournament: registerForTournament(id: $id)
  }
`

export const LEAVE_TOURNAMENT = gql`
  mutation leaveTournament($id: Int!) {
    leaveTournament: leaveTournament(id: $id)
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

  const [
    leaveTournament,
    { loading: loadingLeaveTournament, error: errorLeaveTournament },
  ] = useMutation(LEAVE_TOURNAMENT, {
    onCompleted: () => {
      toast.success('Successfully Left Tournament')
      navigate(`/tournament/${tournament.tournamentUrl}/rounds`)
    },
    refetchQueries: [
      {
        query: TOURNAMENT_BY_URL,
        variables: { url: tournament.tournamentUrl },
      },
    ],
  })

  const checkIfSignupActive = () => {
    // Tournament not started
    let tournamentNotStarted = tournament?.dateStarted == null

    // Tournament is active
    let tournamentIsActive = tournament.active

    // Tournament not full
    let tournamentNotFull = tournament.players.length < tournament.maxPlayers

    if (tournamentNotFull && tournamentIsActive && tournamentNotStarted) {
      return true
    }

    return false
  }

  const checkIfCanSignup = () => {
    // Can sign up if:
    // Not in Tournament
    let notInTournament = !isInTournament()

    // User is a player (and signed in)
    let userEligible = currentUser?.user.id && hasRole('PLAYER')

    if (notInTournament && userEligible && checkIfSignupActive()) {
      return true
    }

    return false
  }

  const returnInfoText = () => {
    // Tournament has been cancelled
    if (!tournament.active) return 'Event has been cancelled'
    // Tournament has started
    if (tournament.dateEnded) return 'Event has already ended'
    // Not a player
    if (!hasRole('PLAYER')) return 'Only players may register for this event'
    // Already registered
    if (isInTournament()) return 'You have already registered for this event'
    // Tournament has started
    if (tournament.dateStarted) return 'Event has already started'
    // Tournament full
    if (tournament.players.length >= tournament.maxPlayers)
      return 'Event is full'

    return 'You have not signed up for this event'
  }

  //Check if applicable to register
  const isInTournament = () => {
    var playerList = {}
    tournament.players?.forEach(
      ({ player }) => (playerList[player.id] = { ...player })
    )

    if (playerList && currentUser?.user?.id in playerList) {
      return true
    }

    return false
  }

  const generateUrl = (stringify = true) => {
    let url =
      process.env.FRONTEND_URL +
      '/tournament/' +
      tournament.tournamentUrl +
      '/signup'

    if (stringify) {
      url = url.replaceAll(':', '%3A')
      url = url.replaceAll('/', '%2F')
    }

    return url
  }

  const generateUrlText = () => {
    let text = `Signup for the ${tournament.name} genesis tournament here!`
    return text.replaceAll(' ', '%20')
  }

  const copyText = () => {
    let text = generateUrl(false)

    navigator.clipboard.writeText(text).then(
      function () {
        toast.success('Successfully copied tournament url')
      },
      function () {
        toast.error(
          'There was an error in copying the tournament url, please try again'
        )
      }
    )
  }

  const confirmLeaveTournament = () => {
    if (confirm('Are you sure you would like to leave this tournament')) {
      leaveTournament({ variables: { id: tournament.id } })
    }
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl uppercase text-gray-900 mb-6 font-normal">
        User Signups
      </h2>
      <p className="text-gray-500 mb-6">
        Signups for this event are{' '}
        <strong>{checkIfSignupActive() ? 'open' : 'closed'}</strong>.
      </p>
      <p className="text-gray-500">{returnInfoText()}</p>
      {isInTournament() && (
        <Button
          onClick={() => confirmLeaveTournament()}
          loading={loadingLeaveTournament}
          full={false}
          className="w-1/2 sm:w-1/4 mb-0"
          color="red"
        >
          <p className="text-center">Leave Tournament</p>
        </Button>
      )}
      {checkIfSignupActive && !currentUser && (
        <Button
          onClick={() => navigate(routes.signup())}
          loading={loading}
          full={false}
          className="w-1/2 sm:w-1/4 mb-0"
        >
          <p className="text-center v">Create an account here</p>
        </Button>
      )}
      {checkIfCanSignup() && (
        <Button
          onClick={() =>
            registerForTournament({ variables: { id: tournament.id } })
          }
          loading={loading}
          full={false}
          className="w-1/2 sm:w-1/4"
        >
          <p className="text-center v">Sign up</p>
        </Button>
      )}
      <div className="mt-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Share via</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${generateUrl()}`}
              target="_blank"
              className="h-10 w-full inline-flex justify-center py-2 px-10 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              rel="noreferrer"
            >
              <span className="sr-only">Sign in with Facebook</span>
              <FacebookIcon />
            </a>
          </div>

          <div>
            <a
              href={`https://twitter.com/intent/tweet?url=${generateUrl()}&text=${generateUrlText()}&hashtags=Genesis%2CTournament`}
              target="_blank"
              className="h-10 w-full inline-flex justify-center py-2 px-10 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              rel="noreferrer"
            >
              <span className="sr-only">Sign in with Twitter</span>
              <TwitterIcon />
            </a>
          </div>

          <div>
            <button
              onClick={async () => copyText()}
              className="h-10 w-full inline-flex justify-center py-2 px-10 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Copy Link</span>
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentSignupTab
