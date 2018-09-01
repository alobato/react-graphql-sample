const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    me: User

    user(
      id: ID!
    ): User

    users: [User!]
  }

  extend type Mutation {
    createUser(email: String!): User!

    updateUser(
      email: String!
      name: String!
    ): User!
    
    signUp(
      name: String!
      email: String!
      password: String!
    ): Token!

    signIn(
      email: String!
      password: String!
    ): Token!

    deleteUser(
      id: ID!
    ): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    name: String
    email: String!
    role: String
  }
`
