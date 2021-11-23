const {gql} = require('apollo-server');

module.exports = gql`
  extend type Query {
    getUser(id: ID!): User
  }

  extend type Mutation {
    registerUser(input: RegisterInput): User
    loginUser(input: LoginInput): Token
    uploadAvatar(file: Upload): UploadAvatar
  }

  type Token {
    token: String
  }

  type UploadAvatar {
    status: Boolean
    urlAvatr: String
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

  input Upload {
    _: String
  }

  type User {
    id: String!
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
