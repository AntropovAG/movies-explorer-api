const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use(usersRouter);
router.use(moviesRouter);

router.use((req, res, next) => next(new NotFoundError('Такой страницы не существует')));

module.exports = router;
