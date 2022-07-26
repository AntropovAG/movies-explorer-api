const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  updateUserInfo,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/users/me', getCurrentUserInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = router;
