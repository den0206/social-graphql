const dotEnv = require('dotenv');
const mongoose = require('mongoose');

module.exports.connectMongo = async () => {
  dotEnv.config();

  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connevt Mongo DB');
  } catch (e) {
    console.log(e);
    throw e;
  }
};
