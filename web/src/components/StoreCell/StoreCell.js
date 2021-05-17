import Store from 'src/components/Store'

export const QUERY = gql`
  query FIND_STORE_BY_ID($id: String!) {
    store: store(id: $id) {
      id
      name
      ownerId
      email
      phone
      lat
      lng
      street1
      street2
      city
      country
      state
      zip
      distributor
      approved
      approvedOn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Store not found</div>

export const Success = ({ store }) => {
  return <Store store={store} />
}
