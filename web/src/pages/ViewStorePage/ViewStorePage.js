import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'

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
  const { data: storeData , loading, error } = useQuery(FIND_ACTIVE_STORE_BY_ID, {
    variables: { id: storeId },
  })

  if (loading) {
    return (
      <LoadingIcon size={'44px'} />
    )
  }

  const { activeStore } = storeData

  return (
    <>
      <MetaTags
        title={`View Store ${activeStore?.name}`}
        description="View Genesis Store Page"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl md:max-w-6xl px-4">

        </div>
      </div>
    </>
  )
}

export default ViewStorePage
