require('dotenv').config({ path: './secrets.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, secret } = config;
// const { port, dbUrl, secret } = config;
// Initialize express
// Create a new instance of express
const app = express();

// TODO: DB Conexion (MongoDB)
app.set('config', config);
// Set is useful to assign a NAME and VALUE to the variable
app.set('pkg', pkg);
//
const connectDB = require('./config/dbConn');
// Connect to MongoDB
connectDB();

const database = mongoose.connection;

database.on('error', (error) => {
  console.error(`Failed to connect to the database: ${error}`);
});

database.once('open', () => {
  console.info('Connected to MongoDB');
});

// database.on('disconnected', function () {
//   console.log('Disconnected from the database');
// })

// .....................................................................
// app.get('/', (req, res) => {
//   res.json({
//     name: app.get('pkg').name,
//     author: app.get('pkg').author,
//     version: app.get('pkg').version
//   });
// });

// app.get('/products', (req, res) => {
//   res.json({
//     name: 'Product 1',
//     price: 1000,
//   });
// });
// .....................................................................
app.use(cors());
// Use a body parsing middleware
// Now our server will be able to understand the data that is sent to it
// through a form and convert it into a JavaScript object parse application
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Our app will be able to understand json archives
app.use(express.json());
// These middleware functions will parse the incoming request body and add
// the parsed data to the req.body object
app.use(authMiddleware(secret));

// Register routes
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);
  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});

module.exports = app;
