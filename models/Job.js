const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, 'Please provide company field'],
      maxlength: 50,
    },
    position: {
      type: String,
      require: [true, 'Please provide position field'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'declined', 'approved', 'interview'],
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
