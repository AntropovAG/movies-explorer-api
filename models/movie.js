const mongoose = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: (str) => isURL(str),
    required: true,
  },
  trailerLink: {
    type: String,
    validate: (str) => isURL(str),
    required: true,
  },
  thumbnail: {
    type: String,
    validate: (str) => isURL(str),
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('movie', movieSchema);
