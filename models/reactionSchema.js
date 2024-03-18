
const { Schema } = require('mongoose');
const formatDate = require('../utils/dateFormatter');


const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp)
    }
  },
  // options object
  {
    toJSON: {
      getters: true,
      versionKey: false
    },
    id: false
  }
);


module.exports = reactionSchema;
