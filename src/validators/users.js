const { check, validationResult } = require('express-validator');

const validatorCreateUser = [
  check('id')
    .exists()
    .notEmpty(),
  check('usuario')
    .exists()
    .notEmpty(),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400);
      res.send({ errors: error.array(), message: 'validation new user error' });
    }
  }
]

const validatorGetUser = [
  check('id')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400);
      res.send({ errors: error.array(), message: 'validation id error' });
    }
  }
]

module.exports = { validatorGetUser, validatorCreateUser };