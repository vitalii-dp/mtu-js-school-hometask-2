// Problem 3
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.

const errors = {
  WRONG_TYPE: 'The input should be a string.',
  EMPTY_VALUE: 'The input should not be an empty string.',
  WRONG_CHARACTERS: 'The input should only have these characters "(", ")", "{", "}", "[", and "]".',
  MAX_LENGTH: 'The max input length is 104.'
}

function validateInput(input) {
  const regexp = /[^\(\)\[\]\{\}]/

  if (typeof input !== 'string') {
    throw new Error(errors.WRONG_TYPE)
  }
  if (input.match(regexp)) {
    throw new Error(errors.WRONG_CHARACTERS)
  }
  if (input === '') {
    throw new Error(errors.EMPTY_VALUE)
  }
  if (input.length > 104) {
    throw new Error(errors.MAX_LENGTH)
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