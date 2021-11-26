const User = require('../../database/model/user');
const Like = require('../../database/model/like');

async function getLikes(args) {
  const likes = await Like.find({imageid: args.imageid}).populate('userid');

  return likes;
}
async function getLikesCount(args) {
  try {
    const result = await Like.countDocuments(args.imageid);
    return result;
  } catch (e) {}
}
async function checkLiked(args, context) {
  const {id} = context.user;
  const isLiked = await Like.findOne({imageid: args.imageid})
    .where('userid')
    .equals(id);

  return isLiked;
}

async function addLike(args, context) {
  try {
    const {id} = context.user;
    const isLiked = await checkLiked(args, context);

    if (!isLiked) {
      console.log('Add');
      const like = Like({imageid: args.imageid, userid: id});
      like.save();
    } else {
      console.log('Delete');
      await Like.findByIdAndDelete(isLiked._id);
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  addLike,
  getLikes,
  getLikesCount,
  checkLiked,
};
