const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: 'Anonymous'
  },
  login: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  topResult: {
    type: Number,
    default: 0
  },
  gamesCount: {
    type: Number,
    required: true,
    default: 0
  },
  role: {
    type: String,
    default: 'gamer'
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  userIp: {
    type: String,
    required: true
  }
}, { collection: 'users' })

module.exports = mongoose.model('User', userSchema)