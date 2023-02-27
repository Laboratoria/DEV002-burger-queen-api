const {
  createNewUser,
  getListUsers,
  updatePerson,
  deletePerson,
} = require('../services/users');

const { getUserByUid, getUserByEmail } = require('../services/auth');

const { isAdmin } = require('../middleware/auth');

const User = require('../models/users');

const { isValidEmail, isValidPassword } = require('../utils/validations');
const { buildLinks } = require('../utils/pagination')

module.exports = {
  // Create a new User in the database and assign them roles
  // based on the info provided in the request body (req.body)
  createUser: async (req, res, next) => {
    // next :next function in the middleware chain
    try {
      const { email, password, roles } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'Neither email nor password was provided' });
      if (!isValidEmail(email) || !isValidPassword(password)) return res.status(400).json({ message: 'Email or password has invalid format' });
      const userFound = await getUserByEmail(email);
      if (userFound) return res.status(403).json({ message: `${email} has already been registered. Please use a different email address` });
      const user = await createNewUser(email, password, roles);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req, res, next) => {
    try {
      // Get the total number of Users in the database
      const count = await User.count();
      const { page = 1, limit = 10 } = req.query;
      // Calculate the total number of pages
      const totalPages = Math.ceil(count / limit);
      // Get the Users from the database
      const users = await getListUsers(page, limit);
      const link = buildLinks(req.get('host'), 'users', limit, page, totalPages);
      // Return Users and links as JSON response
      res.set('Link', link);
      // Allows the variable to be accessed in subsequent middleware
      res.locals.link = link;
      // Returns the response in JSON format
      return res.json(users);
      // res.status(200).json({ message: 'Successful operation', users });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      // Search for a User in the database through their uid
      const user = await getUserByUid(req.params.uid);
      // If the user with the specified uid is not found, an error message should
      // be returned in JSON format and the HTTP status code is set to 404
      if (!user) return res.status(404).json({ message: `User with id ${req.params.uid} could not be found` });
      // Compare the Id of the user making the request with the userId found in the database
      // If they are equal the user information is returned
      // If thats not the case, the isAdmin function is called to check if the requesting user has
      // admin permissions
      if (req.userToken.id === user._id.toString() || await isAdmin(req)) {
        // Return user info
        return res.json(user);
      }
      return next(403);
    } catch (error) {
      next(error);
    }
  },
  putUser: async (req, res, next) => {
    try {
      const admin = await isAdmin(req);
      const user = await getUserByUid(req.params.uid);
      // Check if the person making the request is an User registered in the databse
      if (!user) return res.status(404).json({ message: `User with id ${req.params.uid} could not be found` });
      // If the person making the request isnt the owner of the doc to be updated
      // and is not an administrator either return status code 403
      if (req.userToken.id !== user._id.toString() && !admin) {
        return res.status(403).json({ message: 'Admin permission is required, or you need to be the owner' });
      }
      // Extract the user data that you want to update
      let { email, password, roles } = req.body;
      // If a value was provided for the "roles" field and the requesting user is not an admin,
      // a response is returned with a 403 status code
      if (roles && !admin) {
        return res.status(403).json({ message: 'Modifying roles value requires admin permission' });
      }
      // If no data was provided to update, or if the email or password is empty, return a response
      // with a 400 status cde
      if ((Object.keys(req.body).length === 0) || email === '' || password === '') {
        return res.status(400).json({ message: 'Neither email nor password was provided' });
      }
      // Verify that email has the right format
      if (email && !isValidEmail(email)) return res.status(400).json({ message: 'Email field has invalid format' });
      // Verify that password has the right format
      if (password && !isValidPassword(password)) return res.status(400).json({ message: 'Password field has invalid format' });
      !password ? password = user.password : null;
      !email ? email = user.email: null;
      !roles? roles = user.roles: null;
      // Send updated data
      const userUpdate = await updatePerson(user._id, user.roles._id, email, password, roles);
      // If an error occurs, the "next" function is called with the error
      return res.json(userUpdate);
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const user = await getUserByUid(req.params.uid);
      if (!user) return res.status(404).json({ message: `User with id ${req.params.uid} could not be found` });
      // Checks if the user id in the auth token matches the id of the user
      // that wants to delete || if the user is an administrator
      if (req.userToken.id !== user._id.toString() && !await isAdmin(req)) {
        return res.status(403).json({ message: 'Admin permission is required, or you need to be the owner' });
      }
      await deletePerson(user._id, user.roles._id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
};
