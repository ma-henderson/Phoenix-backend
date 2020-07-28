const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GoalSchema = new Schema({
  userId: {
    type: String
  },
  title: {
    type: String,
    default: '...'
  },
  input: {
    type: Object,
  },
  goal: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const GoalModel = mongoose.model('goal', GoalSchema);
module.exports = GoalModel;