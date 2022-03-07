import { Form, useForm } from '@redwoodjs/forms'
import { useLazyQuery } from '@apollo/client'
import Button from 'src/components/Button/Button'
import GoogleMapWrapper from 'src/components/GoogleMapWrapper/GoogleMapWrapper'
import { getAddress } from 'src/helpers/formatAddress'
import { useEffect, useRef } from 'react'
import { logError } from 'src/helpers/errorLogger'
import StoreLocatorItem from 'src/components/StoreLocatorItem/StoreLocatorItem'
import { useJsApiLoader } from '@react-google-maps/api'
import GoogleMapAutocompleteInput from 'src/components/GoogleMapAutocompleteInput/GoogleMapAutocompleteInput'

export const SEARCH_STORES = gql`
  query storeLocator($input: SearchStoresInput!) {
    storeLocator: storeLocator(input: $input) {
      totalCount
      more
      stores {
        id
        name
        lat
        lng
        tournaments {
          startDate
        }
        distance
        street1
        street2
        city
        country
        state
        zip
      }
    }
  }
`
const StoreLocatorPage = () => {
  const mapRef = useRef(null)
  const [isGoogleInitialized, setIsGoogleInitialized] = React.useState(false)
  const [startingLocation, setStartingLocation] = React.useState({
    lat: 0,
    lng: 0,
  })
  const [storeList, setStoreList] = React.useState([])
  const [fetchingMore, setFetchingMore] = React.useState([])
  const formMethods = useForm()
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_API_KEY // ,
    // ...otherOptions
  })


  const [searchStores, { called, loading }] = useLazyQuery(SEARCH_STORES, {
    onCompleted: (res) => {
      setStoreList(res.storeLocator.stores)
    },
    onError: (error) => {
      logError({
        error,
        log: true,
        showToast: true,
      })
    },
  })

  useEffect(() => {
    getUserGeneralLocation()
  }, [])

  const onSubmit = (data) => {
    searchStores({
      variables: {
        input: {

        },
      },
    })
  }

  const getUserGeneralLocation = () => {
    fetch('https://ip.nf/me.json', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        const lat = data.ip.latitude
        const lng = data.ip.longitude

        setStartingLocation({ lat, lng })
        searchStores({ variables: { input: { lat, lng} } })
      })
      .catch((err) => console.log(err))
  }


  return (
    <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl md:max-w-6xl px-4">
        <h2 className="sm:mt-8 mb-6 text-left text-xl text-gray-900">
          Find a store
        </h2>
        <p className="text-sm mb-1">Enter Address or Postal Code</p>
        <Form
          onSubmit={onSubmit}
          formMethods={formMethods}
          className="flex items-center mb-4"
        >
          <GoogleMapAutocompleteInput
            onSelectAddress={(address) => {
              console.log(address)
            }}
          />
        </Form>
        <div className="w-full flex flex-row ">
          <div className="w-2/5 flex flex-col h-auto overflow-y-auto max-h-1/2 border-t-2 border-gray-400">
            {storeList.length > 0 ? (
              storeList.map((store) => (
                <StoreLocatorItem store={store} mapRef={mapRef} key={store.id} isGoogleInitialized={isGoogleInitialized} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                No stores found
              </div>
            )}
          </div>
          <div className="px-4 w-3/5">
            <GoogleMapWrapper mapRef={mapRef} onMapLoad={() => setIsGoogleInitialized(true)} center={startingLocation} stores={storeList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLocatorPage
