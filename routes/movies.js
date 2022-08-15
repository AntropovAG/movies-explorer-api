const moviesRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { isURL } = require('validator');
const {
  getMovies, createNewMovie, deleteMovieById,
} = require('../controllers/movies');

const validateURL = (message) => Joi.string().required().custom((v, helper) => {
  if (isURL(v)) {
    return v;
  }
  return helper.message(message);
});

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: validateURL('В изображении должна быть валидная ссылка'),
    trailerLink: validateURL('В трейлере должна быть валидная ссылка'),
    thumbnail: validateURL('В изображении должна быть валидная ссылка'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createNewMovie);

moviesRouter.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), deleteMovieById);

module.exports = moviesRouter;
