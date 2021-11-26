const functions = require('./upload_image_functions');

const resolvers = {
  Query: {
    getUploadImages: (_, args) => functions.getUploadImages(args),
    getImagesFolloweds: (_, __, context) =>
      functions.getImagesFolloweds(context),
  },
  Mutation: {
    uploadImage: (_, {file}, context) => functions.uploadImage(file, context),
  },
};

module.exports = resolvers;
