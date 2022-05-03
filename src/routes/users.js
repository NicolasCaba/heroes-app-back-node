const express = require('express');
const router = express.Router();

// Controllers
const { getUser, createUser } = require('./../controllers/users');
// Validators middlewares
const { validatorGetUser, validatorCreateUser } = require('./../validators/users');

// Get user by id
router.get('/:id', validatorGetUser, getUser);

// Create new user
router.post('/', validatorCreateUser, createUser);

module.exports = router;