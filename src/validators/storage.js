const { check, validationResult } = require('express-validator');

const validatorGetStorage = [
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

module.exports = { validatorGetStorage };