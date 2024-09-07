const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id; // Save user ID in session
    res.redirect('/tasks');
  } catch (error) {
    res.status(400).send('Error signing up');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    req.session.userId = user._id; // Save user ID in session after successful login
    res.redirect('/tasks');
  } catch (error) {
    res.status(400).send('Error logging in');
  }
};

// In authController.js
exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error logging out.');
      }
      res.redirect('/login'); // Redirect to login page after logout
    });
  };
  