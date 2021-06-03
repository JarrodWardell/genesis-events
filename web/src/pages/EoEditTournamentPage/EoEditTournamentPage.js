import { useQuery } from '@redwoodjs/web'
import TournamentEOForm from 'src/components/TournamentEoForm/TournamentEoForm'

export const TOURNAMENT_BY_URL_SIMPLE = gql`
  query tournamentByUrl($url: String!) {
    tournamentByUrl: tournamentByUrl(url: $url) {
      id
      tournamentUrl
      name
      desc
      startDate
      maxPlayers
      locationName
      lat
      lng
      street1
      city
      country
      state
      zip
      ownerId
      storeId
      store {
        name
      }
    }
  }
`

const EOEditTournamentPage = ({ url }) => {
  const {
    loading,
    error,
    data: { tournamentByUrl: tournament } = {},
  } = useQuery(TOURNAMENT_BY_URL_SIMPLE, {
    variables: { url },
  })

  return (
    <>
      <TournamentEOForm tournament={tournament} />
    </>
  )
}

export default EOEditTournamentPage
