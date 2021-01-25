// Problem 2
// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

const { palindrome: errors} = require('./errors')

function validateInput(input) {
  if (!Number.isInteger(+input) || Array.isArray(input) || typeof input === 'boolean' || input === '') {
    throw new Error(errors.WRONG_INPUT)
  }
  if (input < (-2) ** 31 || input > 2 ** 31 - 1) {
    throw new Error(errors.MAX_MIN_VALUE)
  }
}

module.exports = input => {
  validateInput(input)
  const reversedInput = input.toString().split('').reverse().join('')
  return reversedInput === input.toString()
}