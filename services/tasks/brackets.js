// Problem 3
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.

const { brackets: errors} = require('./errors')
const InputValidationError = require('../../utils/custom_errors/InputValidationError')

function validateInput(input) {
  const regexp = /[^\(\)\[\]\{\}]/

  if (typeof input !== 'string') {
    throw new InputValidationError(errors.WRONG_TYPE)
  }
  if (input.match(regexp)) {
    throw new InputValidationError(errors.WRONG_CHARACTERS)
  }
  if (input === '') {
    throw new InputValidationError(errors.EMPTY_STRING)
  }
  if (input.length > 104) {
    throw new InputValidationError(errors.MAX_LENGTH)
  }
}

module.exports = expression => {
  validateInput(expression)
  if (expression.length % 2 !== 0) {
    return false
  }

  const characters = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  let arr = []
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === '(' || expression[i] === '[' || expression[i] === '{') {
      arr.push(expression[i])
    } else if (arr[arr.length - 1] === characters[expression[i]]) {
      arr.pop()
    }
  } 
  return arr.length === 0
}