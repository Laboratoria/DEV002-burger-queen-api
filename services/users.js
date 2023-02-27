// Importamos el modelo de datos y las dependencias necesarias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/users');
const Role = require('../models/roles');

module.exports.createNewUser = async (email, password, roles) => {
  // Create a role object and save it
  const role = await new Role(roles).save();
  // Generamos las rondas de SALT que utilizaremos para encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  // Create a user object and save it
  const user = new User({
    email,
    password: bcrypt.hashSync(password, salt),
    roles: role._id,
  });
  user.save();
  // Populate user referencing documents in the collection "roles"
  return user.populate('roles');
};

module.exports.getListUsers = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const users = await User.find({}).sort('email').populate('roles').skip(startIndex);
    .limit(limit);
  return users;
};

module.exports.updatePerson = async (_id, rolesId, email, password, roles) => {
  await Role.findByIdAndUpdate(rolesId, roles, { new: true });
  const user = await User.findByIdAndUpdate(_id, { email, password: bcrypt.hashSync(password, 10) }, { new: true }).populate('roles');
  return user;
};

module.exports.deletePerson = async (_id, rolesId) => {
  await Role.deleteOne({ _id: rolesId });
  await User.deleteOne({ _id });
};
