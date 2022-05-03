const express = require('express');
const router = express.Router();

// Controllers
const { getHeroes, getHeroe, getHeroeByName, createHeroe, updateHeroe, deleteHeroe } = require('./../controllers/heroes');
// Validators middlewares
const { validatorGetHeroe, validatorCreateHeroe, validatorGetHeroeByName } = require('./../validators/heroes');

// Get all heroes
router.get('/', getHeroes);

// Get heroe by id
router.get('/:mongoid', validatorGetHeroe, getHeroe);

// Get heroe by name
router.get('/name/:name', validatorGetHeroeByName, getHeroeByName);

// Create new heroe
router.post('/', validatorCreateHeroe, createHeroe);

// Update heroe
router.put('/:mongoid', validatorGetHeroe, validatorCreateHeroe, updateHeroe);

// Delete heroe
router.delete('/:mongoid', validatorGetHeroe, deleteHeroe);

module.exports = router;