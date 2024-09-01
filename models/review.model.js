const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  points: {
    type: Number,
    max: 5,
    default: 0
  },
  message: {
    type: String,
    min: 5,
    required: true
  }
});

module.exports = model('Review', reviewSchema);