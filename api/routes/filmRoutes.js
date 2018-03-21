'use strict';
module.exports = function(app) {
  var film = require('../controllers/filmController');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.route('/film/query')
    .get(film.getAllFilms)
    .post(film.getFilmQuery);

  app.route('/film/add')
    .post(film.addFilm);

  app.route('/film/delete')
    .delete(film.deleteFilm);

};
