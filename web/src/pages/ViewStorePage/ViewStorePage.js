import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import GoogleMapWrapper from 'src/components/GoogleMapWrapper/GoogleMapWrapper'
import { ClockIcon, DesktopComputerIcon, LocationMarkerIcon, PhoneIcon, SpeakerphoneIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useEffect, useRef } from 'react'

const FIND_ACTIVE_STORE_BY_ID = gql`
  query activeStore($id: String!) {
    activeStore(id: $id) {
      id
      name
      phone
      email
      street1
      street2
      city
      state
      zip
      country
      lat
      lng
    }
  }
`

const ViewStorePage = ({ storeId = '' }) => {
  const [googleStoreDetails, setGoogleStoreDetails] = React.useState({})
  const [isGoogleInitialized, setIsGoogleInitialized] = React.useState(false)
  const newRef = React.useRef(null)

  useEffect(() => {
    const loadData = async () => {
      const service = await new window.google.maps.places.PlacesService(newRef.current)
      service.findPlaceFromQuery({
        query: `${storeData?.activeStore?.name}, ${storeData?.activeStore?.street1}, ${storeData?.activeStore?.city}, ${storeData?.activeStore?.state}, ${storeData?.activeStore?.country}`,
        fields: ['name', 'place_id'],
      }, (results, status) => {
        service.getDetails({
          placeId: results[0].place_id,
          fields: ['name', 'geometry', 'formatted_address', 'formatted_phone_number', 'photos', 'opening_hours', 'place_id', 'website'],
        }, (place, status) => {
          setGoogleStoreDetails({...place})
        })
      })
    }

    if (isGoogleInitialized && newRef.current && window.google) {
      loadData()
    }
  }, [isGoogleInitialized, newRef, window.google])

  const { data: storeData , loading, error } = useQuery(FIND_ACTIVE_STORE_BY_ID, {
    variables: { id: storeId }
  })

  if (loading) {
    return (
      <LoadingIcon size={'44px'} />
    )
  }
  return (
    <>
      <MetaTags
        title={`View Store ${storeData?.activeStore?.name}`}
        description="View Genesis Store Page"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <div ref={newRef} />
      <div className="min-h-screen container mx-auto flex flex-col bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl md:max-w-6xl px-4">
          <h2 className="sm:mt-8 mb-6 text-left text-xl text-gray-900">
            {storeData?.activeStore?.name}
          </h2>
          <div className="flex">
            <div className="w-2/5">
            <div className="flex w-full items-center">
              <LocationMarkerIcon className="w-4 h-4 mr-2" />
              <p className="font-bold ">{storeData?.activeStore?.name}</p>
            </div>
            <div className="flex flex-col my-4">
              <p className="">
                {storeData?.activeStore?.street1} {storeData?.activeStore?.street2}
              </p>
              <p className="">
                {storeData?.activeStore?.city}, {storeData?.activeStore?.state} {storeData?.activeStore?.zip}
              </p>
            </div>
            {
              googleStoreDetails?.opening_hours?.weekday_text?.length > 0 && (
                <div className="flex flex-col mb-4 w-1/2">
                  <div className="flex">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <p className="font-bold ml-2">Store Hours:</p>
                  </div>
                  {
                    googleStoreDetails?.opening_hours?.weekday_text?.map((weekday_text, index) => {
                      const period_breakdown = weekday_text.split(':')
                      return (

                        <div key={index} className="flex">
                          <p className="">{period_breakdown[0]}</p>
                          <p className="ml-auto">{period_breakdown.slice(1).join(":")}</p>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            <div className="flex w-full items-center mb-4">
              <PhoneIcon className="w-4 h-4 mr-2" />
              <p className="font-bold ">Phone Number: </p> <p>{googleStoreDetails.formatted_phone_number}</p>
            </div>
            <div className="flex w-full items-center">
              <DesktopComputerIcon className="w-4 h-4 mr-2" />
              <p className="font-bold ">Website: </p> <p>{googleStoreDetails.website}</p>
            </div>


          </div>
          <div className="w-3/5">
            <div id="map"></div>
            <GoogleMapWrapper
              onMapLoad={mapRef => {
                setIsGoogleInitialized(true)
              }}
              height={'400px'}
              center={storeData?.activeStore ? { lat: storeData?.activeStore?.lat, lng: storeData?.activeStore?.lng } : { lat: 0, lng: 0 }}
              stores={storeData?.activeStore ? [{ lat: storeData?.activeStore?.lat, lng: storeData?.activeStore?.lng }] : []}
            />
          </div>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full items-center mb-4">
              <SpeakerphoneIcon className="w-4 h-4 mr-2" />
              <p className="font-bold ">Upcoming Tournaments: </p>
            </div>
            <div className="flex flex-wrap">
              {storeData?.activeStore?.tournaments?.map((tournament, index) => {
                return (
                  <div key={`tournament-${tournament.id}`}>
                    {tournament.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewStorePage
