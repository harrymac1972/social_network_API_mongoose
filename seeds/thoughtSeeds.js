
const Thought = require('../models/Thought');

const thoughtObjs = [
  {
    thoughtText: 'Up! Up! and away!',
    username: 'superman',
  },
  {
    thoughtText: 'I can swing from a thread, take a look overhead',
    username: 'spiderman',
  },
  {
    thoughtText: 'To the Batcave',
    username: 'batman',
  },
  {
    thoughtText: 'Do not make me angry',
    username: 'hulk',
    reactions: [
        {
            reactionBody: 'Okey Dokey!',
            username: 'spiderman'
        },
        {
            reactionBody: 'Calm down my green dude',
            username: 'superman'
        },
        {
            reactionBody: 'oooohhhh',
            username: 'batman'
        },
    ]
  },
];

const thoughtSeeds = async () => {
  try {
    await Thought.create(thoughtObjs);
    console.log('Thoughts seeded');
  } catch (error) {
    console.error('Error seeding thoughts:', error);
  }
};

module.exports = thoughtSeeds;
