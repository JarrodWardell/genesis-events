export const schema = gql`
  type UserPicture {
    id: Int!
    name: String
    url: String!
    smallUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: [User]!
    active: Boolean
  }

  type Query {
    userPictures: [UserPicture!]!
    userPicture(id: Int!): UserPicture
  }

  input CreateUserPictureInput {
    name: String
    url: String!
    smallUrl: String
    active: Boolean
  }

  input UpdateUserPictureInput {
    name: String
    url: String
    smallUrl: String
    active: Boolean
  }

  type Mutation {
    createUserPicture(input: CreateUserPictureInput!): UserPicture!
    updateUserPicture(id: Int!, input: UpdateUserPictureInput!): UserPicture!
    deleteUserPicture(id: Int!): UserPicture!
  }
`
