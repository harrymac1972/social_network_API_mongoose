
const userSeeds = require('./userSeeds');
const thoughtSeeds = require('./thoughtSeeds');
// const reactionSeeds = require('./reactionSeeds');

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialDB');

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Once the connection is open, seed the database
db.once('open', async () => {
    try {
        console.log('\n----- DATABASE SYNCED -----\n');
        await userSeeds();
        console.log('\n----- USERS SEEDED -----\n');
        await thoughtSeeds();
        console.log('\n----- THOUGHTS SEEDED -----\n');
        // await reactionSeeds();
        // console.log('\n----- REACTIONS SEEDED -----\n');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
});
