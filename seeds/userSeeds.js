
const User = require('../models/User');

const userObjs = [
  {
    username: 'superman',
    email: 'superman@superman.com',
  },
  {
    username: 'spiderman',
    email: 'spiderman@spiderman.com',
  },
  {
    username: 'batman',
    email: 'batman@batman.com',
  },
  {
    username: 'hulk',
    email: 'hulk@hulk.com',
  },
];

const userSeeds = async () => {
  try {
    await User.create(userObjs);
    console.log('Users seeded');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = userSeeds;
