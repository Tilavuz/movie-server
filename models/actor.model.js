const { Schema, model } = require('mongoose');

const actorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: true,
    default: 'actor-default-image.png'
  }
});

module.exports = model('Actor', actorSchema);