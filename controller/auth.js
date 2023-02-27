const { comparePassword, generateJWT, getUserByEmail } = require('../services/auth');

module.exports.auth = async (req, res, next) => {
  try {
    // Destructure the req.body object and extract the values of email and password
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email or password not found' });

    // Verify if a user exists in our database by looking up their email
    const userFound = await getUserByEmail(email);
    if (!userFound) return res.status(404).json({ message: "User doesn't exists" });

    // Verify if the supplied password matches the one stored in the database
    const existsPassword = await comparePassword(password, userFound.password);
    if (!existsPassword) return res.status(404).json({ message: 'Invalid password' });

    // Generate a unique JWT for a specific user based on their id
    const token = await generateJWT(userFound._id);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};
