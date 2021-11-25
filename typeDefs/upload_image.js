const {gql} = require('apollo-server-express');

const uploadImageScheme = gql`
  extend type Mutation {
    uploadImage(file: Upload!): ImageResult
  }

  type ImageResult {
    status: Boolean
    url: String
  }
`;

module.exports = uploadImageScheme;
