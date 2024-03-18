
require('dotenv').config();


const { connection } = require('mongoose');
const mongoose = require('mongoose');

const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

mongoose.connect(connStr);


module.exports = connection;
