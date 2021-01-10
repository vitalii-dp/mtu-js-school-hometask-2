// Problem 2
// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

const errors = {
  WRONG_TYPE: 'The input should be a number.',
  MAX_MIN_VALUE: 'The input is out of range.'
}

function validateInput(input) {
  if (typeof input === 'bigint' || isNaN(input) || Array.isArray(input) || typeof input === 'boolean' || input === '') {
    throw new Error(errors.WRONG_TYPE)
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