const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  jobposts:[
    { 
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
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Jobs = mongoose.model('jobs', JobSchema);