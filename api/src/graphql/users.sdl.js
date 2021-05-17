export const schema = gql`
  type User {
    id: String!
    firstname: String
    lastname: String
    nickname: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    howHeard: String
    approved: Boolean!
    approvedOn: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    userRoles: [UserRole]!
    providers: [Provider]!
  }

  type UserRole {
    id: Int!
    name: String!
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Provider {
    id: Int!
    uuid: String!
    type: String!
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
    checkNickname(nickname: String): Boolean!
  }

  input CreateUserInput {
    role: String!
    email: String!
    nickname: String!
    firstname: String!
    lastname: String!
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    howHeard: String
  }

  input CreateUserStoreInput {
    name: String!
    email: String!
    phone: String!
    lat: Float!
    lng: Float!
    street1: String!
    city: String!
    country: String!
    state: String!
    zip: String!
    distributor: String!
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
    nickname: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    howHeard: String
    approved: Boolean
    approvedOn: DateTime
    flags: Int
    adminComments: String
    disabled: Boolean
    disabledOn: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!, storeInput: CreateUserStoreInput): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
