const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  updateUserInfo,
  getCurrentUserInfo,
} = require('../controllers/users');

userRouter.get('/users/me', getCurrentUserInfo);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = userRouter;
