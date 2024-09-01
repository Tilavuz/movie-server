const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  rating: {
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  actors: [{
    type: Schema.Types.ObjectId,
    ref: 'Actor'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  is_paid: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    required: true,
    default: 0
  },
  year: Number,
  country: String,
  age_restiction: {
    type: Boolean,
    default: true
  },
  title: String,
  photo: {
    type: String,
    default: 'movie-default-image.png'
  },
  video: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('Movie', movieSchema);