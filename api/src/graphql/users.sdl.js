export const schema = gql`
  type User {
    id: Int!
    firstname: String
    lastname: String
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
  }

  input CreateUserInput {
    role: String!
    firstname: String
    lastname: String
    gender: String
    phone: String
    city: String
    state: String
    country: String
    zip: String
    howHeard: String
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
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
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
