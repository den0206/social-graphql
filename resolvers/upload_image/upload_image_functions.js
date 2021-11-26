const User = require('../../database/model/user');
const UploadImage = require('../../database/model/upload_image');
const Follow = require('../../database/model/follow');
const aws = require('../../utils/aws-upload-image');
const {v4: uuidv4} = require('uuid');

async function getUploadImages(args) {
  const foundUser = await User.findOne({username: args.username});
  if (!foundUser) throw new Error('User Not Found');

  const images = await UploadImage.find()
    .where({userid: foundUser._id})
    .sort({createdAt: -1});

  console.log(images.length);

  return images;
}

async function getImagesFolloweds(context) {
  const {id} = context.user;
  const followeds = await Follow.find({userid: id}).populate('follow');

  const followesList = [];
  for await (const data of followeds) {
    followesList.push(data.follow);
  }
  console.log(followesList);

  const resImages = [];

  for await (const data of followesList) {
    const images = await UploadImage.find({userid: data._id}).populate(
      'userid'
    );

    resImages.push(...images);
  }
  const res = resImages.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  console.log(res);
  return res;
}

async function uploadImage(file, context) {
  const {id} = context.user;

  const {createReadStream, mimetype} = await file;
  const extension = mimetype.split('/')[1];
  const imageName = `user_images/${id}/${uuidv4()}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await aws.awsUploadImage(fileData, imageName);
    const uploadImage = new UploadImage({
      userid: id,
      file: result,
      typeFile: mimetype.split('/')[0],
      createdAt: Date.now(),
    });

    uploadImage.save();
    return {
      status: true,
      url: result,
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      url: null,
    };
  }
}

module.exports = {uploadImage, getUploadImages, getImagesFolloweds};
