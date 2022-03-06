import { ClockIcon, DesktopComputerIcon, LocationMarkerIcon, SpeakerphoneIcon } from '@heroicons/react/solid'
import { Link, routes } from '@redwoodjs/router'
import { format } from 'date-fns'

const StoreLocatorItem = ({ store, showDistance = true }) => {
  const tournamentsAfterToday = store.tournaments.filter((tournament) => new Date(tournament.startDate) > new Date()).sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  return (
    <Link
    to={routes.viewStore({
      storeId: store.id
    })}
    className="flex flex-col border-t-2 border-gray-400 py-3 text-gray-700 hover:bg-gray-300 cursor-pointer px-2"
  >
      <div className="flex w-full items-center">
        <LocationMarkerIcon className="w-4 h-4 mr-2" />
        <p className="font-bold ">{store.name}</p>
        {
          showDistance && store.distance >= 0 && (
            <p className="ml-auto ">{Math.floor(store.distance)} km away</p>
          )
        }
      </div>
      <div className="flex flex-col my-4">
        <p className="">
          {store.street1} {store.street2}
        </p>
        <p className="">
          {store.city}, {store.state} {store.zip}
        </p>
      </div>
      <div className="flex mb-4">
        <ClockIcon className="w-4 h-4 mr-2" />
        <p className="font-bold">Store Hours:</p> <p className="ml-1"> 8 - 9pm</p>
      </div>
      {
        tournamentsAfterToday.length > 0 && (
          <div className="flex mb-4">
            <SpeakerphoneIcon className="w-4 h-4 mr-2" />
            <p className="font-bold ">Next Tournament Date: {" "}</p> <p className="ml-1"> { format(new Date(tournamentsAfterToday[0].startDate), "PP")} at {format(new Date(tournamentsAfterToday[0].startDate), "p")}</p>
          </div>
        )
      }
      {
        store.website && (
          <div className="flex">
            <DesktopComputerIcon className="w-4 h-4 mr-2" />
            <p className="font-bold">Website: </p> <p className="ml-1"> {store.website}</p>
          </div>
        )
      }
  </Link>
  )
}

export default StoreLocatorItem
