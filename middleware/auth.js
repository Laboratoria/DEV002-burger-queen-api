const jwt = require('jsonwebtoken');
// const User = require('../models/users');
const { getUserByUid } = require('../services/auth');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    getUserByUid(decodedToken.id)
      .then((userFound) => {
        if (!userFound) return resp.status(400).json({ message: 'No encontrado' });
        req.userToken = decodedToken;
        return next();
      }).catch(() => next(403));
  });
};

module.exports.isAuthenticated = (req) => !!req.userToken;
// TODO: decidir por la informacion del request si la usuaria esta autenticada
// false

module.exports.isAdmin = async (req) => {
  // TODO: decidir por la informacion del request si la usuaria es admin
  // false
  const user = await getUserByUid(req.userToken.id);
  return user.roles.admin;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = async (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!(await module.exports.isAdmin(req)))
      ? next(403)
      : next()
);
