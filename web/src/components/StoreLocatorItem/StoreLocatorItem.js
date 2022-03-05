import { LocationMarkerIcon } from '@heroicons/react/solid'

const StoreLocatorItem = ({ store }) => {
  return (
    <div className="flex flex-col border-t-2 border-gray-200 py-3 text-gray-700 hover:bg-gray-300 cursor-pointer px-2">
      <div className="flex w-full items-center">
        <LocationMarkerIcon className="w-4 h-4 mr-2" />
        <p className="font-bold ">{store.name}</p>
        <p className="ml-auto ">{store.distance} km away</p>
      </div>
      <div className="flex flex-col my-4">
        <p className="">
          {store.street1} {store.street2}
        </p>
        <p className="">
          {store.city}, {store.state} {store.zip}
        </p>
      </div>
      <div className="flex">
        <p className="font-bold">Store Hours:</p> <p className=""> 8 - 9pm</p>
      </div>
    </div>
  )
}

export default StoreLocatorItem
