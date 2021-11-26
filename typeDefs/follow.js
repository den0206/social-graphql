const {gql} = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    isFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFolloweds(username: String!): [User]
    getNotFolloweds: [User]
  }
  extend type Mutation {
    follow(username: String!): Boolean
    unfollow(username: String!): Boolean
  }
`;
