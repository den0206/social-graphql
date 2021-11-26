const {gql} = require('apollo-server-express');

const likeScehem = gql`
  extend type Query {
    checkLiked(imageid: ID!): Boolean
    getLikes(imageid: ID!): [Like]
    getLikesConut(imageid: ID!): Int
  }
  extend type Mutation {
    addLike(imageid: ID!): Boolean
  }

  type Like {
    imageid: ID
    userid: User
  }
`;

module.exports = likeScehem;
