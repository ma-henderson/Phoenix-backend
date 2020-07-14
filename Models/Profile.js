const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  userId: {
    type: String
  },
  username: {
    type: String
  },
  profileImage: {
    type: String,
    default: '...'
  },
  description: {
    type: String
  },
  currentWeight: {
    type: Number
  },
  goalWeight: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ProfileModel = mongoose.model('profile', ProfileSchema);
module.exports = ProfileModel;