const mongoose = require("mongoose");

//Definir el schema

const GameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  categories: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
  images: {
    poster_image_url: {
      type: String,
      default: 'default_poster.jpg'
    },
    banner_image_url: {
        type: String,
        default: 'default_banner.jpg'
    },
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("Game", GameSchema);
