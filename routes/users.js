const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  updateUserInfo,
  getCurrentUserInfo,
  userLogin,
  userSignup,
  userSignOut,
} = require('../controllers/users');

userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userLogin);

userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userSignup);

userRouter.use(auth);

userRouter.get('/users/me', getCurrentUserInfo);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

userRouter.post('/signout', userSignOut);

module.exports = userRouter;
