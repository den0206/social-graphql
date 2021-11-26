const mongoose = require('mongoose');

const commentScheme = mongoose.Schema({
  imageid: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'UploadImage',
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  text: {type: String, require: true, trim: true},
  createdAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Comment', commentScheme);
