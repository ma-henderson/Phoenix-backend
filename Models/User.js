const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;