import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { useLazyQuery } from '@apollo/client'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { getAddress } from 'src/helpers/formatAddress'

export const SEARCH_TOURNAMENTS = gql`
  query searchTournaments($input: SearchTournamentInput!) {
    searchTournaments: searchTournaments(input: $input) {
      id
      name
      tournamentUrl
      startDate
      maxPlayers
      playerCount
      distance
      store {
        name
      }
      winners {
        player {
          nickname
        }
      }
      lat
      lng
      street1
      street2
      city
      country
      state
      zip
    }
  }
`

const TournamentSearchPage = () => {
  const { pathname, search, hash } = useLocation()

  const [filters, setFilters] = React.useState({
    lat: null,
    lng: null,
    country: null,
    city: null,
    name: null,
    location: null,
    dateStart: null,
    dateEnd: null,
    openSpotsOnly: false,
  })

  const [newFilters, setNewFilters] = React.useState({
    ...filters,
  })

  const [loadingLocation, setLoadingLocation] = React.useState(false)
  const [data, setData] = React.useState([])

  const [searchTournaments, { called, loading }] = useLazyQuery(
    SEARCH_TOURNAMENTS,
    {
      onCompleted: (res) => {
        setData(res.searchTournaments)
      },
    }
  )

  React.useEffect(() => {})

  React.useEffect(() => {
    breakdownSearch()
    getUserGeneralLocation()
  }, [])

  const breakdownSearch = () => {
    if (search) {
      let query = {}
      let brokeSearch = search.slice(1, search.length)
      brokeSearch = brokeSearch.split('&')
      brokeSearch.forEach((param) => {
        let brokeParam = param.split('=')
        if (
          brokeParam.length === 2 &&
          brokeParam[0] in filters &&
          brokeParam[1] !== ''
        ) {
          let val = brokeParam[1]
          if (brokeParam[0] === 'lat' || brokeParam[0] === 'lng')
            val = parseFloat(val)

          if (brokeParam[0] === 'location') val = val.replaceAll('%20', ' ')

          if (brokeParam[0] === 'openSpotsOnly') val = val === 'true'
          query[brokeParam[0]] = val
        }
      })

      let newQuery = {
        ...filters,
        ...query,
      }

      setFilters({
        ...newQuery,
      })

      setNewFilters({
        ...newQuery,
      })

      searchTournaments({ variables: { input: { ...newQuery } } })
    }
  }

  const getUserGeneralLocation = () => {
    fetch('https://ip.nf/me.json', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true)
      navigator.geolocation.getCurrentPosition((pos) => {
        setNewFilters({
          ...newFilters,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          location: 'Current Location',
          country: null,
        })
        setLoadingLocation(false)
      })
    }
  }

  const searchTourneys = () => {
    searchTournaments({ variables: { input: { ...newFilters } } })
    setFilters({
      ...newFilters,
    })
    stringifyParams({ ...newFilters })
  }

  const convertToKM = (km) => {
    if (km <= 1) {
      return 'Less than a km away'
    } else {
      return `${Math.floor(km)} km away`
    }
  }

  const onSelectAddress = async (data) => {
    var addr = await getAddress(data.label)
    setNewFilters({
      ...filters,
      location: addr.formatted_address,
      country: addr.country,
      lat: addr.lat,
      lng: addr.lng,
    })
  }

  const addFilter = (key, value) => {
    setNewFilters({
      ...filters,
      [key]: value,
    })
  }

  const stringifyParams = (queryFilter) => {
    let queryString = ''
    let queryArray = []
    Object.keys(queryFilter).forEach((queryKey) => {
      if (queryFilter[queryKey] && (queryKey !== 'lat' || queryKey !== 'lng')) {
        queryArray.push([queryKey, queryFilter[queryKey]])
      }
    })

    if (queryArray.length > 0) {
      queryString = '?'
      queryArray.forEach((query, index) => {
        queryString += `${index > 0 ? `&` : ``}${query[0]}=${query[1]}`
      })
    }

    navigate(`${pathname}${queryString}`)
  }

  return (
    <>
      <div className="min-h-screen container mx-auto flex flex-col bg-gray-100 border-sm text-sm text-gray-700 p-4">
        <div className="flex">
          <h1>Tournament Search</h1>
        </div>
        <div className="flex">
          <div className="w-1/2 relative">
            <input
              onChange={(e) => addFilter('name', e.target.value)}
              value={filters.name}
              className="rw-input"
              placeholder="Tournament Name"
            />
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-4">
            <input
              type="date"
              className="rw-input mx-4"
              value={filters.dateStart}
              onChange={(e) => addFilter('dateStart', e.target.value)}
            />
            <input
              type="date"
              className="rw-input mx-4"
              min={filters.dateStart}
              value={filters.dateEnd}
              onChange={(e) => addFilter('dateEnd', e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="rw-input flex">
            <button
              className="mx-4"
              onClick={getUserLocation}
              disabled={loadingLocation}
            >
              x
            </button>
            <GooglePlacesAutocomplete
              apiKey={process.env.GOOGLE_API_KEY}
              selectProps={{
                value: {
                  label: filters.location,
                  value: { description: filters.location, place_id: '' },
                },
                onChange: onSelectAddress,
                className: 'w-full',
              }}
            />
          </div>
          <div className="mx-4 flex flex-col">
            <p>Open spots only?</p>
            <input
              type="checkbox"
              checked={newFilters.openSpotsOnly}
              onClick={(e) => {
                addFilter('openSpotsOnly', !newFilters.openSpotsOnly)
              }}
            ></input>
          </div>
          <button
            onClick={searchTourneys}
            className="bg-green-400 m-4 px-4 py-2"
            disabled={JSON.stringify(filters) === JSON.stringify(newFilters)}
          >
            SEARCH
          </button>
        </div>
      </div>
      <div className="grid">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((tournament) => (
            <div
              key={tournament.id}
              onClick={() =>
                navigate(`/tournament/${tournament.tournamentUrl}/rounds`)
              }
              className="flex flex-col p-4 cursor-pointer hover:bg-gray-300"
            >
              <div>{tournament.name}</div>
              <div>
                Spots Available: {tournament.playerCount}/
                {tournament.maxPlayers}
              </div>
              {tournament.distance && (
                <div>{convertToKM(tournament.distance)}</div>
              )}
              {tournament.street1 ? (
                <div>
                  {tournament.street1}, {tournament.city}
                </div>
              ) : (
                <div>No address provided</div>
              )}

              {tournament.winners.length > 0 && (
                <div>
                  <div className="font-bold">WINNERS</div>{' '}
                  {tournament.winners.map((winner) => (
                    <p
                      key={`tournament-${tournament.id}-winner-${winner.player.nickname}`}
                    >
                      {winner.player.nickname}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default TournamentSearchPage
