

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
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async updateUser(req, res) {
    try {
        // WedDevSimp says use    User.findById().save()
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No such user' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user' });
      }
      await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId } }
      );
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(400).json(error);
    }
  },

}



module.exports = userController;