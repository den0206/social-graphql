const {gql} = require('apollo-server-express');

const uploadImageScheme = gql`
  extend type Query {
    getUploadImages(username: String!): [UploadImage]
    getImagesFolloweds: [UploadImage]
  }
  extend type Mutation {
    uploadImage(file: Upload!): ImageResult
  }

  type ImageResult {
    status: Boolean
    url: String
  }

  type UploadImage {
    id: ID
    userid: User
    file: String
    fileType: String
    createdAt: String
  }
`;

module.exports = uploadImageScheme;
