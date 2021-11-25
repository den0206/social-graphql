const userResolver = require('./user/user');
const followResolver = require('./follow/follow');
const uploadImageResolver = require('./upload_image/upload_image');

module.exports = [userResolver, followResolver, uploadImageResolver];
