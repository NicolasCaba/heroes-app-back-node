const mongoose = require('mongoose');

const databaseConnect = async () => {
  const DB_URI = process.env.DB_URI;
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error, response) => {
    !error ? console.log('DB connected') : console.log(error);
  });

}

module.exports = { databaseConnect };