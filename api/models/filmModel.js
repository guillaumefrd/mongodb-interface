'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  _id: String,
  title: String,
  plot: String,
  year: Number,
  release_date: String,
  rank: Number,
  rating: Number,
  directors: [],
  genres: [],
  image: String,
  running_time_secs: Number
});

module.exports = mongoose.model('Film', FilmSchema);
