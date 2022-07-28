const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { userLogin, userSignup, userSignOut } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userLogin);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userSignup);

router.use(auth);

router.use(usersRouter);
router.use(moviesRouter);

router.post('/signout', userSignOut);

router.use((req, res, next) => next(new NotFoundError('Такой страницы не существует')));

module.exports = router;
