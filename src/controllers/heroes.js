const { matchedData } = require('express-validator');
const heroesModel = require('./../models/heroes');
const { handleHttpError } = require('./../utils/handleErrors');

/**
 * GET all heroes
 * @param {*} req 
 * @param {*} res 
 */
const getHeroes = async (req, res) => {
  try {
    const { _limit } = req.query;

    if(req.query.q) {
      const nameRegEx = new RegExp(req.query.q); 
      let heroes = await heroesModel.findAllDataByName(nameRegEx);

      heroes = heroes.slice(0, _limit);
      
      res.status(200).send(heroes);
    } else {
      let heroes = await heroesModel.findAllData();
      
      heroes = heroes.slice(0, _limit);
      
      res.status(200).send(heroes);
    }

  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot get Heroes' });
  }
}

/**
 * GET one heroe by mongo id
 * @param {*} req 
 * @param {*} res 
 */
const getHeroe = async (req, res) => {
  try {
    req = matchedData(req);
    const { mongoid } = req;
    const heroe = await heroesModel.findOneData(mongoid);
    res.status(200).send(heroe);
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot get Heroe by id' });
  }
}

/**
 * GET Get heroe by name
 * @param {*} req 
 * @param {*} res 
 */
const getHeroeByName = async (req, res) => {
  try {
    req = matchedData(req);
    const { name } = req;
    const heroe = await heroesModel.findOneDataByName(name);
    res.status(200).send(heroe);
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot get Heroe by name' });
  }
}

/**
 * POST Create new heroe
 * @param {*} req 
 * @param {*} res 
 */
const createHeroe = async (req, res) => {
  try {
    const heroe = matchedData(req);

    const response = await heroesModel.create(heroe);
    if (response) {
      res.status(200).send({ message: 'Heroe creado correctamente', response });
    }
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot create Heroe' });
  }
}

/**
 * PUT Update heroe
 * @param {*} req 
 * @param {*} res 
 */
const updateHeroe = async (req, res) => {
  try {
    const { mongoid, ...body } = matchedData(req);
    const response = await heroesModel.findByIdAndUpdate(mongoid, body);
    res.status(200).send({ message: 'Heroe actualizado correctamente', response });
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot update Heroe' });
  }
}

/**
 * DELETE Delete heroe
 * @param {*} req 
 * @param {*} res 
 */
const deleteHeroe = async (req, res) => {
  try {
    req = matchedData(req);
    const { mongoid } = req;
    const response = await heroesModel.findByIdAndDelete(mongoid);
    res.status(200).send({ message: 'Heroe eliminado correctamente', response });
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot delete Heroe by id' });
  }
}

module.exports = { getHeroes, getHeroe, getHeroeByName, createHeroe, updateHeroe, deleteHeroe };