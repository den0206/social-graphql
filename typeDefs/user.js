const {gql} = require('apollo-server-express');

module.exports = gql`
  scalar Upload
  extend type Query {
    getUser(id: ID!): User
    users(query: String): [User]
  }

  extend type Mutation {
    registerUser(input: RegisterInput): User
    loginUser(input: LoginInput): Token
    uploadAvatar(file: Upload!): ReturnAvatar!
    deleteAvatar(url: String!): Boolean!
    updateUser(input: UserUpdateInput): Boolean!
  }

  type Token {
    token: String
  }

  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type ReturnAvatar {
    status: Boolean
    url: String
  }

  input RegisterInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserUpdateInput {
    name: String
    email: String
    currentPassword: String
    newPassword: String
    description: String
    siteWeb: String
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
    avatar: String
    siteWeb: String
    description: String
    createdAt: String!
  }
`;
