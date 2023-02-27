// const jwt = require('jsonwebtoken');
// const config = require('../config');
// const User = require('../models/User');

// const { secret } = config;

const { auth } = require('../controller/auth');

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  // app.post('/auth', async (req, resp, next) => {
  //   const { email, password } = req.body;

  //   if (!email || !password) {
  //     return next(400);
  //   };

  // TODO: autenticar a la usuarix
  // next();
  // const user = await User.findOne({ email });
  // if(!user) return next(404);

  // const passwordMatch = await user.comparePassword(password);
  // if(!passwordMatch) return next(401);
  // const token = jwt.sign({uid:user._id}, secret);
  // return resp.json({token});
  app.post('/auth', auth);
  // });
  return nextMain();
};
