const User = require('../../database/model/user');
const bcrypt = require('bcryptjs');
const awsUploadImage = require('../../utils/aws-upload-image');
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
    const token = createToken(user, secret, {expiresIn: '1d'});
    return {token};
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function uploadAvatar(file) {
  console.log(file);
  return null;
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

module.exports = {
  getUser,
  registerUser,
  loginUser,
  uploadAvatar,
};
