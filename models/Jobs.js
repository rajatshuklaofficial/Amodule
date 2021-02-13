const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      title: {
        type:String
      },
      company: {
        type: String
      },
      description: {
        type: String
      },
      location: {
        type: String
      },
      status: {
        type: String,
        required: true,
        default:"Active"
      },
      date: {
        type: Date,
        default: Date.now
      }
});

module.exports = Jobs = mongoose.model('jobs', JobSchema);