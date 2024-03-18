
const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactionSchema');
const formatDate = require('../utils/dateFormatter');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  // options object
  {
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;

