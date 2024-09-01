const { Schema, model } = require('mongoose');

const genreSchema = new Schema({
  type: {
    type: String,
    required: true
  }
});

module.exports = model('Genre', genreSchema);