const Follow = require('../../database/model/follow');
const User = require('../../database/model/user');

/// query

async function isFollow(args, context) {
  const userFound = await User.findOne({username: args.username});
  console.log(userFound._id == userFound.id);

  if (!userFound) throw new Error('user not found');

  const follow = await Follow.find({userid: context.user.id})
    .where('follow')
    .equals(userFound._id);

  if (follow.length > 0) {
    return true;
  }

  return false;
}

async function getFollowers(args, context) {
  const userFound = await User.findOne({username: args.username});
  if (!userFound) throw new Error('user not found');

  const followes = await Follow.find({follow: userFound._id}).populate(
    'userid'
  );

  const res = [];

  for await (const data of followes) {
    res.push(data.userid);
  }

  return res;
}

async function getFolloweds(args) {
  const userFound = await User.findOne({username: args.username});
  if (!userFound) throw new Error('user not found');
  const followeds = await Follow.find({userid: userFound._id}).populate(
    'follow'
  );

  const res = [];

  for await (const data of followeds) {
    res.push(data.follow);
  }

  return res;
}

async function getNotFolloweds(context) {
  const users = await User.find().limit(50);
  const array = [];
  for await (const data of users) {
    const isFound = Follow.findOne({userid: context.userid})
      .where('follow')
      .equals(data._id);

    if (!isFound && data._id.toString() !== context.user.id.toString()) {
      array.push(data);
    }
  }

  return array;
}

/// mutation

async function follow(args, context) {
  const userFound = await User.findOne({username: args.username});
  if (!userFound) throw new Error('user not found');
  if (userFound.id == context.user.id) throw new Error('Cant follow yourself');

  try {
    const follow = new Follow({userid: context.user.id, follow: userFound.id});
    follow.save();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function unfollow(args, context) {
  const userFound = await User.findOne({username: args.username});
  const deleteFollow = await Follow.deleteOne({userid: context.user.id})
    .where('follow')
    .equals(userFound._id);

  console.log(deleteFollow);

  if (deleteFollow.deletedCount > 0) {
    return true;
  }
  return false;
}

module.exports = {
  isFollow,
  getFollowers,
  getFolloweds,
  getNotFolloweds,
  follow,
  unfollow,
};
