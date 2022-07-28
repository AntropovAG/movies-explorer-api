const Movie = require('../models/movie');
const NoRightsToDeleteError = require('../errors/NoRightsToDeleteError');
const NotFoundError = require('../errors/NotFoundError');
const WrongDataError = require('../errors/WrongDataError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

module.exports.createNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new WrongDataError('Введены неверные данные'));
      }
      return next(error);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Такого фильма не обнаружено'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new NoRightsToDeleteError('Удаление запрещено'));
      }
      return movie.remove()
        .then(() => res.status(200).send({ message: 'Фильм успешно удален' }));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new WrongDataError('Ошибка в ID фильма'));
      }
      return next(error);
    });
};
