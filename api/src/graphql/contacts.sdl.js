export const schema = gql`
  type Contact {
    id: Int!
    name: String!
    email: String!
    text: String!
    userId: String
    createdAt: DateTime!
    updatedAt: DateTime!
    userContact: User
  }

  type Query {
    contacts: [Contact!]! @requireAuth
    contact(id: Int!): Contact @requireAuth
  }

  input CreateContactInput {
    name: String!
    email: String!
    text: String!
    userId: String
  }

  input UpdateContactInput {
    name: String
    email: String
    text: String
    userId: String
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
    updateContact(id: Int!, input: UpdateContactInput!): Contact! @requireAuth
    deleteContact(id: Int!): Contact! @requireAuth
  }
`
