const {gql} = require('apollo-server-express');
const userTypeDefs = require('./user');
const followScheme = require('./follow');
const uploadScheme = require('./upload_image');

const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, followScheme, uploadScheme];
