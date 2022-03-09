import {
  Form,
  FormError,
  TextAreaField,
  TextField,
  useForm,
  Label,
  FieldError,
} from '@redwoodjs/forms'
import { useLazyQuery } from '@apollo/client'
import GoogleMapWrapper from 'src/components/GoogleMapWrapper/GoogleMapWrapper'
import { useEffect, useRef } from 'react'
import { logError } from 'src/helpers/errorLogger'
import StoreLocatorItem from 'src/components/StoreLocatorItem/StoreLocatorItem'
import GoogleMapAutocompleteInput from 'src/components/GoogleMapAutocompleteInput/GoogleMapAutocompleteInput'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Button from 'src/components/Button/Button'
import { CREATE_CONTACT_MUTATION } from '../UserContactPage/UserContactPage'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useAuth } from '@redwoodjs/auth'

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
        website
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
  const [maxDistance, setMaxDistance] = React.useState(3000)
  const takeAmount = 8
  const [take, setTake] = React.useState(takeAmount)
  const [storeList, setStoreList] = React.useState([])
  const [currentSearch, setCurrentSearch] = React.useState('')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [didSearchLocation, setDidSearchLocation] = React.useState(false)
  const [hasBeenCalled, setHasBeenCalled] = React.useState(false)
  const [fetchingMore, setFetchingMore] = React.useState(false)
  const formMethods = useForm()
  const contactUsFormMethods = useForm()
  const { currentUser } = useAuth()

  const [searchStores, { called, loading, data }] = useLazyQuery(
    SEARCH_STORES,
    {
      onCompleted: (res) => {
        setHasBeenCalled(true)
        if (fetchingMore) {
          setStoreList((prev) => [...prev, ...res.storeLocator.stores])
        } else {
          setStoreList(res.storeLocator.stores)
        }
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
    }
  )

  const [createContact, { loading: loadingContact, error }] = useMutation(
    CREATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Your form has been submitted!')
        formMethods.reset()
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
    }
  )

  const onSave = (input) => {
    createContact({ variables: { input } })
  }

  useEffect(() => {
    getUserGeneralLocation()
  }, [])

  const onSubmit = (submitData) => {
    setHasBeenCalled(false)
    setTake(takeAmount)
    setStartingLocation({ lat: submitData.lat, lng: submitData.lng })
    setFetchingMore(false)
    setCurrentSearch(submitData.input)
    setDidSearchLocation(true)

    searchStores({
      variables: {
        input: {
          lat: submitData.lat,
          lng: submitData.lng,
          skip: 0,
          take: takeAmount,
          includeOnline: false,
          distance: maxDistance,
        },
      },
    })
  }

  const onSubmitQuery = () => {
    setHasBeenCalled(false)
    setTake(takeAmount)
    setFetchingMore(false)
    setCurrentSearch(searchTerm)
    setDidSearchLocation(false)

    searchStores({
      variables: {
        input: {
          searchTerm,
          skip: 0,
          take: takeAmount,
          includeOnline: true,
          distance: maxDistance,
        },
      },
    })
  }

  const loadMore = () => {
    setTake(take + takeAmount)
    setFetchingMore(true)

    searchStores({
      variables: {
        input: {
          lat: startingLocation.lat,
          lng: startingLocation.lng,
          skip: take,
          take: takeAmount,
          includeOnline: false,
          distance: maxDistance,
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
        searchStores({
          variables: {
            input: {
              lat,
              lng,
              take: takeAmount,
              skip: 0,
              includeOnline: true,
              distance: maxDistance,
            },
          },
        })
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
          onSubmit={onSubmitQuery}
          formMethods={formMethods}
          className="flex items-center mb-4"
        >
          <GoogleMapAutocompleteInput
            onSelectAddress={onSubmit}
            onChangeInput={(text) => setSearchTerm(text)}
          />
          <div className="ml-2">
            <Button
              full={false}
              type="submit"
              onClick={onSubmitQuery}
              loading={loading}
            >
              Search
            </Button>
          </div>
        </Form>
        <div className="w-full flex flex-row ">
          <div className="w-2/5 flex flex-col h-auto">
            <div className="flex flex-col h-auto mb-6">
              <h4 className="text-gray-700 font-bold mb-1">Search Results</h4>
              {hasBeenCalled &&
                (storeList.length > 0 ? (
                  <p>
                    Showing {storeList.length} of{' '}
                    {data?.storeLocator.totalCount}{' '}
                    {didSearchLocation ? (
                      <span>locations near </span>
                    ) : (
                      <span>stores that match</span>
                    )}
                    {currentSearch ? (
                      <span className="text-red-400 ml-1">{currentSearch}</span>
                    ) : (
                      <span className="text-red-400 ml-1">
                        your approximate location
                      </span>
                    )}
                  </p>
                ) : (
                  <p>
                    <span className="text-red-400 mr-1">No results found.</span>{' '}
                    Drop us a line with the store details to be included in our
                    database!{' '}
                  </p>
                ))}
            </div>
            <div
              className={
                'flex-flex-col max-h-1/2 overflow-y-auto' +
                (storeList.length > 0 ? ' border-t-2 border-gray-400' : '')
              }
            >
              {storeList && storeList.length > 0 ? (
                storeList.map((store) => (
                  <StoreLocatorItem
                    store={store}
                    mapRef={mapRef}
                    key={store.id}
                    isGoogleInitialized={isGoogleInitialized}
                    showDistance={didSearchLocation}
                  />
                ))
              ) : hasBeenCalled ? (
                <Form
                  onSubmit={onSave}
                  error={error}
                  formMethods={contactUsFormMethods}
                  className="flex flex-col"
                >
                  <FormError
                    wrapperClassName="rw-form-error-wrapper"
                    titleClassName="rw-form-error-title"
                    listClassName="rw-form-error-list"
                  />

                  <Label
                    name="text-gray-700 mt-2"
                    className="text-gray-700"
                    errorClassName="rw-label rw-label-error"
                  >
                    Name
                  </Label>
                  <TextField
                    name="name"
                    defaultValue={currentUser?.user?.name}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                  />
                  <FieldError name="name" className="rw-field-error" />

                  <Label
                    name="email"
                    className="text-gray-700 mt-2"
                    errorClassName="text-gray-700 rw-label-error"
                  >
                    Email Address
                  </Label>
                  <TextField
                    name="email"
                    defaultValue={currentUser?.user?.email}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                  />
                  <FieldError name="email" className="rw-field-error" />
                  <Label
                    name="text"
                    className="text-gray-700 mt-2"
                    errorClassName="text-gray-700 rw-label-error"
                  >
                    Message
                  </Label>
                  <TextAreaField
                    name="text"
                    className="rw-input"
                    rows={6}
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                    defaultValue={
                      didSearchLocation
                        ? `I'm looking for a store near ${currentSearch}\n\nStore Name: \nStore Address: ${currentSearch}`
                        : `I'm looking for a store with the name: ${searchTerm}\n\nStoreName: ${searchTerm} \nStore Address: ${currentSearch}`
                    }
                  />
                  <FieldError name="text" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Button
                      type="submit"
                      loading={loading}
                      full={false}
                      className="w-1/2"
                    >
                      <p className="text-center">Send</p>
                    </Button>
                  </div>
                </Form>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <LoadingIcon size={12} />
                </div>
              )}
              {data?.storeLocator?.more && (
                <Button onClick={loadMore} px={4} py={4} disabled={loading}>
                  Load More
                </Button>
              )}
            </div>
          </div>
          <div className="pl-8 w-3/5">
            <GoogleMapWrapper
              mapRef={mapRef}
              onMapLoad={() => setIsGoogleInitialized(true)}
              center={startingLocation}
              stores={storeList}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLocatorPage