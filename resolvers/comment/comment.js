const functions = require('./comment_functions');

const resolvers = {
  Query: {
    getComments: (_, args) => functions.getComments(args),
  },
  Mutation: {
    addCommnt: (_, {input}, context) => functions.addComment(input, context),
  },
};

module.exports = resolvers;
