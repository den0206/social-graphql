const functions = require('./follow_functions');

const resolvers = {
  Query: {
    isFollow: (_, args, context) => functions.isFollow(args, context),
    getFollowers: (_, args, context) => functions.getFollowers(args, context),
    getFolloweds: (_, args) => functions.getFolloweds(args),
    getNotFolloweds: (_, __, context) => functions.getNotFolloweds(context),
  },

  Mutation: {
    follow: (_, args, context) => functions.follow(args, context),
    unfollow: (_, args, context) => functions.unfollow(args, context),
  },
};

module.exports = resolvers;
