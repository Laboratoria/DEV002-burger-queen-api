const jwt = require('jsonwebtoken');
const { getSpecificUserById } = require('../controller/users')
const SECRET = process.env.JWT_SECRET

module.exports = () =>  (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }
  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err)
      return next(403);
    }
    const userInfo = await getSpecificUserById(decodedToken.uid)
    if(userInfo.username === decodedToken.username){
      next()
    } else {
      return next(401);
    }
  });
};

module.exports.isAuthenticated = (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return resp.status(401).send('No headers');
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err)
      return next(403);
    }
    next()
  })
};

module.exports.isAdmin = (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return resp.status(401).send('No headers');
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err)
      return next(403);
    }
    if(decodedToken.role === 'admin'){
      next()
    } else {
      return next(401);
    }
  })
};

// module.exports.requireAuth = (req, resp, next) => (
//   (!module.exports.isAuthenticated(req))
//     ? next(401)
//     : next()
// );

// module.exports.requireAdmin = (req, resp, next) => (
//   // eslint-disable-next-line no-nested-ternary
//   (!module.exports.isAuthenticated(req))
//     ? next(401)
//     : (!module.exports.isAdmin(req))
//       ? next(403)
//       : next()
// );
