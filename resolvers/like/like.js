const functions = require('./like_functions');

const resolvers = {
  Query: {
    checkLiked: (_, args, context) => functions.checkLiked(args, context),
    getLikes: (_, args) => functions.getLikes(args),
    getLikesConut: (_, args) => functions.getLikesCount(args),
  },
  Mutation: {
    addLike: (_, args, context) => functions.addLike(args, context),
  },
};

module.exports = resolvers;
