const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
  userid: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
  follow: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
  createdAt: {type: Date, default: Date.now()},
});
module.exports = mongoose.model('Follow', followSchema);
