const bcrypt = require('bcrypt')

async function hash(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

async function compare(password, hash) {
  return await bcrypt.compare(password, hash)
}

module.exports = {
  hash,
  compare
}