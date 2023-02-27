// We import the data model and the required dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/users');
const Role = require('../models/roles');

// Extract the 'secret' property from the 'config' object to
// access the secret key used to sign and verify JWT tokens
const { secret } = config;

// Compare a user-supplied plaintext password with its hashed equivalent stored in the database
module.exports.comparePassword = (password, hashedPassword) => new Promise((resolve) => {
  bcrypt.compare(password, hashedPassword, (error, result) => resolve(result));
});

// Generate a token
module.exports.generateJWT = (id) => new Promise((resolve) => {
  // sign() takes 3 arguments:
  // An object: data to be included in the token -> id
  // The secret key to use to encrypt the token
  // An object: the configuration options for the token
  jwt.sign({ id }, secret, { expiresIn: 86400 }, (error, token) => resolve(token));
});

// Search the database for a user document matching a specified email
module.exports.getUserByEmail = async (email) => {
  return await User.findOne({ email }).populate('roles');
};

module.exports.getUserByUid = async (uid) => {
  if (mongoose.Types.ObjectId.isValid(uid)) {
    const _id = uid;
    return await User.findById({ _id }).populate('roles');
  } else {
    return await module.exports.getUserByEmail(uid);
  }
};
