export const schema = gql`
  type Store {
    id: String!
    name: String!
    tournaments: [Tournament]!
    owner: User!
    ownerId: String!
    email: String!
    phone: String!
    lat: Float
    lng: Float
    street1: String!
    street2: String
    city: String!
    country: String!
    state: String!
    zip: String!
    distributor: String!
    approved: Boolean
    approvedBy: User
    approverId: String
    approvedOn: DateTime
  }

  type Query {
    stores(searchTerm: String): [Store!]! @adminOnly
    activeStores(searchTerm: String): [Store!]! @skipAuth
    store(id: String!): Store @adminOnly
  }

  input CreateStoreInput {
    name: String!
    ownerId: String!
    email: String!
    phone: String!
    lat: Float
    lng: Float
    street1: String!
    street2: String
    city: String!
    country: String!
    state: String!
    zip: String!
    distributor: String!
    approved: Boolean
    approvedOn: DateTime
  }

  input UpdateStoreInput {
    name: String
    ownerId: String
    email: String
    phone: String
    lat: Float
    lng: Float
    street1: String
    street2: String
    city: String
    country: String
    state: String
    zip: String
    distributor: String
    approved: Boolean
    approvedOn: DateTime
  }

  type Mutation {
    createStore(input: CreateStoreInput!): Store! @adminOnly
    updateStore(id: String!, input: UpdateStoreInput!): Store! @adminOnly
    deleteStore(id: String!): Store! @adminOnly
  }
`
