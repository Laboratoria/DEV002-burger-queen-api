// Import the mongoose module
const mongoose = require('mongoose');
// Import data from config to define the database URL to connect to
const config = require('../config');

// Wait for database to connect to MongoDB
// Logging an error if there's a problem
const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
};
// Set `strictQuery: false` to globally opt into filtering by properties
// that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7
mongoose.set('strictQuery', false);

module.exports = connectDB;
