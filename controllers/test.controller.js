const roman = require('../services/tasks/roman')
const palindrome = require('../services/tasks/palindrome')
const brackets = require('../services/tasks/brackets')
const sortArray = require('../services/tasks/sortArray')
const nextIndex = require('../services/tasks/nextIndex')
const ParseError = require('../utils/custom_errors/ParseError')

function romanController(req, res, next) {
  try {
    const input = req.body.data
    if (input === undefined || input === null) {
      throw new ParseError('Could not parse input')
    }
    const result = roman(input)
    const response = {result}
    return res.send(JSON.stringify(response))
  } catch (error) {
    return next(error)
  }
}

function palindromeController(req, res, next) {
  try {
    const input = req.body.data
    if (input === undefined || input === null) {
      throw new ParseError('Could not parse input')
    }
    const result = palindrome(input)
    const response = {result}
    return res.send(JSON.stringify(response))
  } catch (error) {
    return next(error)
  }
}

function bracketsController(req, res, next) {
  try {
    const input = req.body.data
    if (input === undefined || input === null) {
      throw new ParseError('Could not parse input')
    }
    const result = brackets(input)
    const response = {result}
    return res.send(JSON.stringify(response))
  } catch (error) {
    return next(error)
  }
}

function sortArrayController(req, res, next) {
  try {
    const {initialArray, comparedArray} = req.body.data
    if (initialArray === undefined || initialArray === null || comparedArray === undefined || comparedArray === null) {
      throw new ParseError('Could not parse input')
    }
    const result = sortArray(initialArray, comparedArray)
    const response = {result}
    return res.send(JSON.stringify(response))
  } catch (error) {
    return next(error)
  }
}

function nextIndexController(req, res, next) {
  try {
    const {nums, target} = req.body.data
    if (nums === undefined || nums === null || target === undefined || target === null) {
      throw new ParseError('Could not parse input')
    }
    const result = nextIndex(nums, target)
    const response = {result}
    return res.send(JSON.stringify(response))
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  romanController,
  palindromeController,
  bracketsController,
  sortArrayController,
  nextIndexController
}