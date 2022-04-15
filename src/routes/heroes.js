const express = require('express');
const router = express.Router();

// Controllers
const { getHeroes, getHeroe, createHeroe, updateHeroe, deleteHeroe } = require('./../controllers/heroes');
// Validators middlewares
const { validatorGetHeroe, validatorCreateHeroe } = require('./../validators/heroes');

// Get all heroes
router.get('/', getHeroes);

// Get heroe by id
router.get('/:mongoid', validatorGetHeroe, getHeroe);

// Create new heroe
router.post('/', validatorCreateHeroe, createHeroe);

// Update heroe
router.put('/:mongoid', validatorGetHeroe, validatorCreateHeroe, updateHeroe);

// Delete heroe
router.delete('/:mongoid', validatorGetHeroe, deleteHeroe);

module.exports = router;