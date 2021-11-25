const User = require('../../database/model/user');
const bcrypt = require('bcryptjs');
const aws = require('../../utils/aws-upload-image');
const jwt = require('jsonwebtoken');

/// Query
async function getUser(args) {
  try {
    const user = User.findById(args.id);
    if (!user) throw new Error('No Found User');

    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/// Mutations
async function registerUser(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const existEmail = await User.findOne({email: newUser.email});
  const existUsername = await User.findOne({username: newUser.username});
  if (existEmail) throw new Error('Email already use');
  if (existUsername) throw new Error('Username already use');
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPasword = await bcrypt.hash(newUser.password, salt);
    const user = User({...newUser, password: hashedPasword});
    user.save();
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function loginUser(input) {
  try {
    const user = await User.findOne({email: input.email.toLowerCase()});
    if (!user) throw new Error('User is not Exist');

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) throw new Error('password is not match');

    const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
    const {id, name, email, username} = user;
    const payload = {
      id,
      name,
      email,
      username,
    };

    const token = jwt.sign(payload, secret, {expiresIn: '1d'});
    return {token};
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function uploadAvatar(file, context) {
  const {id} = context.user;
  console.log(id);
  const {createReadStream, mimetype} = await file;
  const extension = mimetype.split('/')[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await aws.awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, {avatar: result});
    console.log(result);
    return {
      status: true,
      url: result,
    };
  } catch (e) {
    return {
      status: false,
      url: null,
    };
  }
}

async function deleteAvatar(url, context) {
  const {id} = context.user;

  const extension = getUrlExtension(url);
  const imageName = `avatar/${id}.${extension}`;
  console.log(imageName);

  try {
    const delRes = await aws.awsDeleteImage(imageName);
    await User.findByIdAndUpdate(id, {avatar: ''});

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function createToken(user, SECRET_KEY, expiresIn) {
  const {id, name, email, username} = user;
  const payload = {
    id,
    name,
    email,
    username,
  };
  const token = jwt.sign(payload, SECRET_KEY, expiresIn);

  return token;
}

function getUrlExtension(url) {
  try {
    return url.match(/^https?:\/\/.*[\\\/][^\?#]*\.([a-zA-Z0-9]+)\??#?/)[1];
  } catch (ignored) {
    return false;
  }
}

module.exports = {
  getUser,
  registerUser,
  loginUser,
  uploadAvatar,
  deleteAvatar,
};
