const mongoose = require('mongoose');
const uploadImageSceme = mongoose.Schema({
  userid: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
  file: {type: String, require: true, trim: true},
  typeFile: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('UploadImage', uploadImageSceme);
