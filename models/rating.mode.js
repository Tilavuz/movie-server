const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  score: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
});

module.exports = model('Rating', ratingSchema);