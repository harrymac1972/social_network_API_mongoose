

const { Thought } = require('../models');

const thoughtController = {
  
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      if (thoughts.length === 0) {
        return res.status(404).json({ message: 'No thoughts...' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}


module.exports = thoughtController;
