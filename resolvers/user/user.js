const functions = require('./user_functions');
const {GraphQLUpload} = require('graphql-upload');

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getUser: async (_, args) => functions.getUser(args),
    users: (_, args) => functions.users(args),
  },

  Mutation: {
    registerUser: (_, {input}) => functions.registerUser(input),
    loginUser: (_, args) => functions.loginUser(args.input),
    uploadAvatar: (_, {file}, context) => functions.uploadAvatar(file, context),
    deleteAvatar: (_, {url}, context) => functions.deleteAvatar(url, context),
    updateUser: (_, {input}, context) => functions.updateUser(input, context),
  },
};

module.exports = resolvers;
