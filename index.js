require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { databaseConnect } = require('./src/config/dbConnection');

const app = express();

/**
 * cors and post config
 */
app.use(cors());
app.use(express.json());

/**
 * Static assets
 */
app.use(express.static('./src/public'));

/**
 * Routes
 */
app.use('', require('./src/routes/index.routes'));


/**
 * listen
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on http://${process.env.HOST}:${PORT}`);
});

databaseConnect();