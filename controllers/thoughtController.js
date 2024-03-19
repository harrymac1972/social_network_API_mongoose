

const { Thought } = require('../models');

const thoughtController = {
  
  async getAllThoughts(req, res) {
    try {
      const thoughtsArr = await Thought.find();
      if (thoughtsArr.length < 1) {
        return res.status(404).json({ message: 'No Thoughts...' });
      }
      res.json(thoughtsArr);
    } catch (err) {
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
      console.error(err);
      res.status(500).json(err);
    }
  },

}


module.exports = thoughtController;
