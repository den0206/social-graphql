const userResolver = require('./user/user');
const followResolver = require('./follow/follow');
const uploadImageResolver = require('./upload_image/upload_image');
const commentResolver = require('./comment/comment');
const likeResolver = require('./like/like');

module.exports = [
  userResolver,
  followResolver,
  uploadImageResolver,
  commentResolver,
  likeResolver,
];
