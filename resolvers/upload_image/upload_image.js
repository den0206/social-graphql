const functions = require('./upload_image_functions');

const resolvers = {
  Mutation: {
    uploadImage: (_, {file}, context) => functions.uploadImage(file, context),
  },
};

module.exports = resolvers;
