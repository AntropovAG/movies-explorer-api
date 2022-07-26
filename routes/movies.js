const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { isURL } = require('validator');
const {
  getMovies, createNewMovie, deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((v, helper) => {
      if (isURL(v)) {
        return v;
      }
      return helper.message('В изображении должна быть валидная ссылка');
    }),
    trailerLink: Joi.string().required().custom((v, helper) => {
      if (isURL(v)) {
        return v;
      }
      return helper.message('В трейлере должна быть валидная ссылка');
    }),
    thumbnail: Joi.string().required().custom((v, helper) => {
      if (isURL(v)) {
        return v;
      }
      return helper.message('В изображении должна быть валидная ссылка');
    }),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    movieId: Joi.number().required(),
  }),
}), createNewMovie);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteMovieById);

module.exports = router;
