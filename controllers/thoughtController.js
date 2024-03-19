

const { Thought, User } = require('../models');
const logError = require ('../utils/errorLogger');

const thoughtController = {
  
  async getAllThoughts(req, res) {
    try {
      const thoughtsArr = await Thought.find();
      if (thoughtsArr.length < 1) {
        return res.status(404).json({ message: 'No Thoughts...' });
      }
      res.json(thoughtsArr);
    } catch (err) {
        logError(err);
        res.status(500).json(err);
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought exists with that ID' });
      }
      res.json(thought);
    } catch (err) {
        logError(err);
        res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(400).json({ message: 'Invalid User Id' });
      }
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.status(201).json(thought);
    } catch (err) {
        logError(err);
        res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought exists with that ID' });
      }
      res.json(thought);
    } catch (err) {
        logError(err);
        res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought exists with that ID' });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'Thought deleted, but no user with that thought ID' });
      }
      res.json({ message: 'Thought deleted' });
    } catch (err) {
        logError(err);
        res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought exists with that ID' });
      }
      res.json(thought);
    } catch (err) {
        logError(err);
        res.status(500).json(err);
    }
  },

}


module.exports = thoughtController;
