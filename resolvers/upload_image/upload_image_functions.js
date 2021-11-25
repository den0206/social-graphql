const User = require('../../database/model/user');
const UploadImage = require('../../database/model/upload_image');
const aws = require('../../utils/aws-upload-image');
const {v4: uuidv4} = require('uuid');

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

module.exports = {uploadImage};
