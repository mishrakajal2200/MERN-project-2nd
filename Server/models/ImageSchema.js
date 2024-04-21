// models/Image.js

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  location: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
