const dotEnv = require('dotenv');
const AWS = require('aws-sdk');

dotEnv.config();

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET_KEY;
const REGION = process.env.AWS_S3_REGION;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  signatureVersion: 'v4',
  region: REGION,
});

async function awsUploadImage(file, filePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();

    return response.Location;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function awsDeleteImage(filePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
  };

  try {
    const response = await s3.deleteObject(params).promise();
    return response;
  } catch (e) {
    console.log(error);
    throw new Error();
  }
}

module.exports = {awsUploadImage, awsDeleteImage};
