const { Schema, model } = require('mongoose');

const episodeSchema = new Schema({
  title: {
    type: String,
    type: String,
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      }
    ]
  }
});

module.exports = model('Episode', episodeSchema);