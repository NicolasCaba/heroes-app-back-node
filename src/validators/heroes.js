const { check, validationResult } = require('express-validator');

const validatorCreateHeroe = [
  check('id')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  check('superhero')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  check('publisher')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  check('alter_ego')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  check('first_appearance')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  check('characters')
    .exists()
    .notEmpty()
    .trim()
    .escape(),
  check('image_id')
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400);
      res.send({ errors: error.array(), message: 'validation new heroe error' });
    }
  }
]

const validatorGetHeroe = [
  check('mongoid')
    .exists()
    .notEmpty()
    .isMongoId(),
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

module.exports = { validatorGetHeroe, validatorCreateHeroe };