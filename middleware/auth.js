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
    return resp.status(401).send('Unauthorized.');
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err)
      return resp.status(403).send(`You don't have permission to access / on this server.`);
    }
    next()
  })
};

module.exports.isAdmin = (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return resp.status(401).send('Unauthorized.');
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err)
      return resp.status(401).send('Unauthorized');
    }
    if(decodedToken.role === 'admin' || 'superadmin'){
      next()
    } else {
      return resp.status(403).send(`You don't have permission to access / on this server.`);
    }
  })
};
