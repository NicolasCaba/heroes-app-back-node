const { matchedData } = require('express-validator');
const storageModel = require('./../models/storage');
const { handleHttpError } = require('./../utils/handleErrors');

/**
 * GET all storage
 * @param {*} req 
 * @param {*} res 
 */
const getStorages = async (req, res) => {
  try {
    const storages = await storageModel.find({});
    res.status(200).send(storages);
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot get Storages' });
  }
}

/**
 * GET storage by id
 * @param {*} req 
 * @param {*} res 
 */
const getStorage = async (req, res) => {
  try {
    req = matchedData(req);
    const { mongoid } = req;
    const storage = await storageModel.findById(mongoid);
    res.status(200).send(storage);
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot get Storage by id' });
  }
}

/**
 * POST create storage
 * @param {*} req 
 * @param {*} res 
 */
const createStorage = async (req, res) => {
  try {
    const { file } = req;
    const PUBLIC_URL = process.env.PUBLIC_URL;
    const fileData = {
      url: `${PUBLIC_URL}/storage/${file.filename}`,
      filename: file.filename
    }

    const response = await storageModel.create(fileData);
    res.status(200).send({ message: 'Storage creado correctamente', response });
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot create Storage' });
  }
}

/**
 * DELETE Delete one storage
 * @param {*} req 
 * @param {*} res 
 */
const deleteStorage = async (req, res) => {
  try {
    const req = matchedData(req);
    const { mongoid } = req;
    const response = await storageModel.findOneAndDelete(mongoid);
    res.status(200).send({ message: 'Storage eliminado correctamente', response });
  } catch (error) {
    handleHttpError(res, { error, message: 'Cannot delete Storage by id' });
  }
}

module.exports = { getStorages, getStorage, createStorage, deleteStorage };