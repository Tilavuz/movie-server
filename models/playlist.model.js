const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }]
});

module.exports = model('Playlist', playlistSchema);