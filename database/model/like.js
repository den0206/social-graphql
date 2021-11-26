const mongoose = require('mongoose');

const likeScheme = mongoose.Schema({
  imageid: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'UploadImage',
  },
  userid: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
});

module.exports = mongoose.model('Like', likeScheme);
