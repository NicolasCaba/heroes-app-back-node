const { matchedData } = require('express-validator');
const usersModel = require('./../models/users');
const { handleHttpError } = require('./../utils/handleErrors');

/**
 * GET user by id
 * @param {*} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const user = await usersModel.find({ id });
    res.status(200).send(user);
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot get User by id' });
  }
}

/**
 * POST Create new user
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
  try {
    const user = matchedData(req);

    const response = await usersModel.create(user);
    res.status(200).send({ message: 'Usuario creado correctamente', response });
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot create User' });
  }
}

module.exports = { getUser, createUser };