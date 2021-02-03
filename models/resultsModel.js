const mongoose = require('mongoose')

const resultsSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }, { collection: 'results' })

module.exports = mongoose.model('Results', resultsSchema)