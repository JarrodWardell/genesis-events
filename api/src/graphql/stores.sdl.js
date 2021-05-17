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
    approvedOn: DateTime
  }

  type Query {
    stores: [Store!]!
    store(id: String!): Store
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
    createStore(input: CreateStoreInput!): Store!
    updateStore(id: String!, input: UpdateStoreInput!): Store!
    deleteStore(id: String!): Store!
  }
`
