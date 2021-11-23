const dotEnv = require('dotenv');
const AWS = require('aws-sdk');

dotEnv.config();

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({accessKeyId: ID, secretAccessKey: SECRET});

async function awsUploadImage(file, filePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${filePath}`,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = awsUploadImage;
