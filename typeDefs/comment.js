const {gql} = require('apollo-server-express');

const commentScheme = gql`
  extend type Query {
    getComments(imageid: ID): [Comment]
  }
  extend type Mutation {
    addCommnt(input: CommentInput): Comment
  }

  input CommentInput {
    text: String!
    imageid: ID!
  }

  type Comment {
    id: ID
    imageid: ID
    userid: User
    text: String
    createdAt: String
  }
`;

module.exports = commentScheme;
