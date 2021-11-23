const functions = require('./user_functions');

const resolvers = {
  Query: {
    getUser: async (_, args) => functions.getUser(args),
  },

  Mutation: {
    registerUser: (_, {input}) => functions.registerUser(input),
    loginUser: (_, args) => functions.loginUser(args.input),
    uploadAvatar: (_, {file}) => functions.uploadAvatar(file),
  },
};

module.exports = resolvers;
