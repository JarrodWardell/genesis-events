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
    stores(searchTerm: String): [Store!]! @requireAuth
    activeStores(searchTerm: String): [Store!]! @skipAuth
    store(id: String!): Store @requireAuth
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
    createStore(input: CreateStoreInput!): Store! @requireAuth
    updateStore(id: String!, input: UpdateStoreInput!): Store! @requireAuth
    deleteStore(id: String!): Store! @requireAuth
  }
`
