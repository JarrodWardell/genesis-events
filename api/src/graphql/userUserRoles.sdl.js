export const schema = gql`
  type UserUserRole {
    id: Int!
    userId: String!
    userRoleId: Int!
    active: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userRole: UserRole!
  }

  type Query {
    userUserRoles: [UserUserRole!]!
    userUserRole(id: Int!): UserUserRole
  }

  input CreateUserUserRoleInput {
    userId: String!
    userRoleId: Int!
    active: Boolean!
  }

  input UpdateUserUserRoleInput {
    userId: String
    userRoleId: Int
    active: Boolean
  }

  type Mutation {
    createUserUserRole(input: CreateUserUserRoleInput!): UserUserRole!
    updateUserUserRole(id: Int!, input: UpdateUserUserRoleInput!): UserUserRole!
    deleteUserUserRole(id: Int!): UserUserRole!
  }
`
