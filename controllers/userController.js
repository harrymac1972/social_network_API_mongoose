

const { Thought, User } = require('../models');
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
  },  
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: 'No such user' });
      }
      res.json(user);
    } catch (err) {
      logError(err)
      // console.log(error);
      // console.log("\n========\n");
      // console.log(error.message);
      res.status(500).json(err);
    }
  },
}



module.exports = userController;