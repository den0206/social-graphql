const Comment = require('../../database/model/comment');
const User = require('../../database/model/user');
const {v4: uuidv4} = require('uuid');

async function getComments(args) {
  try {
    const comments = await Comment.find({imageid: args.imageid}).populate(
      'userid'
    );

    return comments;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function addComment(input, context) {
  try {
    const {id} = context.user;
    const comment = Comment({
      imageid: input.imageid,
      userid: id,
      text: input.text,
      createdAd: Date.now(),
    });

    comment.save();

    return comment;
  } catch (e) {
    console.log(e);
    throw e;
  }

  console.log(comment);
}

module.exports = {
  getComments,
  addComment,
};
