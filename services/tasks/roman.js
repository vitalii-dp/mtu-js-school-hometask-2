// Problem 1
// Given a roman numeral, convert it to an integer.

const { roman: errors} = require('./errors')

function validateInput(input) {
  const romanRegexp = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i
  if (typeof input !== 'string') {
    throw new Error(errors.WRONG_TYPE)
  }
  if (input === '') {
    throw new Error(errors.EMPTY_VALUE)
  }
  if (!input.match(romanRegexp)) {
    throw new Error(errors.WRONG_ROMAN_NUMERAL)
  }
}

function substractExcess(input, number) {
  let correctResult = number
  if (input.includes('IV', 0) || input.includes('IX', 0)) {
    correctResult -= 2
  }
  if (input.includes('XL', 0) || input.includes('XC', 0)) {
    correctResult -= 20
  }
  if (input.includes('CD', 0) || input.includes('CM', 0)) {
    correctResult -= 200
  }
  return correctResult
}

module.exports = romanString => {
  validateInput(romanString)
  const romanStringUppercased = romanString.toUpperCase()

  let sum = 0
  const romanValues = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  }

  const romansArray = romanStringUppercased.split('')
  romansArray.forEach(el => sum += romanValues[el])
  return substractExcess(romanStringUppercased, sum)
}