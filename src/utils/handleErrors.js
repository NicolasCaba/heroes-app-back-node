/**
 * Handle http errors
 * @param {express res} res 
 * @param {*} message 
 * @param {int} code 
 */
const handleHttpError = (res, message = 'Error', code = 403) => {
  res.status(code);
  res.send({ state: false, message });
}

module.exports = { handleHttpError };