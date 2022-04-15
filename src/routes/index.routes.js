const express = require('express');
const fs = require('fs');
const router = express.Router();

const path_routes = __dirname;

const removeExtension = (filename) => filename.split('.').shift();

fs.readdirSync(path_routes).filter((file) => {
  const name = removeExtension(file);

  if (name !== 'index') {
    router.use(`/${name}`, require(`./${name}`));
  }
});

module.exports = router;