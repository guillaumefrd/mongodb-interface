'use strict';

var mongoose = require('mongoose'),
  Film = mongoose.model('Film');

exports.getAllFilms = function(req, res) {
  Film.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.getFilmQuery = function(req, res) {
  var query = req.body;
  Film.find(query, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.addFilm = function(req, res) {
  var newFilm = new Film(req.body);
  newFilm.save(function(err, data) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ message: 'Film successfully added' });
    }
  });
};

exports.deleteFilm = function(req, res) {
  var query = req.body;
  Film.remove(query, function(err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Film successfully deleted' });
  });
};
