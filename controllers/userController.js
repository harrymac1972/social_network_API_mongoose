

const { User } = require('../models');
const logError = require ('../utils/errorLogger');

const userController = {
  
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users' });
      }
      res.json(users);
    } catch (err) {
      logError(err);
      res.status(500).json(err);
    }
  }
}



module.exports = userController;