const { Schema, model } = require('mongoose');

const videoSchema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  chunks: [
    {
      type: Buffer,
      required: true,
    }
  ],
});

module.exports = model('Video', videoSchema);
