// Problem 4
// Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
// Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. 
// Elements that don't appear in arr2 should be placed at the end of arr1 in ascending order.

const { sortArray: errors} = require('./errors')
const InputValidationError = require('../../utils/custom_errors/InputValidationError')

function validateArrays(initialArray, comparedArray) {
  if (!Array.isArray(initialArray) || !Array.isArray(comparedArray)) {
    throw new InputValidationError(errors.WRONG_TYPE)
  }
  if (initialArray.length === 0 || comparedArray.length === 0) {
    throw new InputValidationError(errors.EMPTY_ARRAY)
  }
  if (comparedArray.length !== new Set(comparedArray).size) {
    throw new InputValidationError(errors.COMPARED_ARRAY_HAS_DUPLICATES)
  }
  if (initialArray.some(el => typeof el !== 'number' || el < 0 || !Number.isFinite(el) || !Number.isInteger(el))) {
    throw new InputValidationError(errors.WRONG_ARRAY_VALUE)
  }
  if (comparedArray.some(el => typeof el !== 'number' || el < 0 || !Number.isFinite(el) || !Number.isInteger(el))) {
    throw new InputValidationError(errors.WRONG_ARRAY_VALUE)
  }
  if (comparedArray.some(el => !initialArray.includes(el))) {
    throw new InputValidationError(errors.COMPARED_ARRAY_EXCESS_VALUE)
  }
  if (initialArray.length > 1000 || comparedArray.length > 1000) {
    throw new InputValidationError(errors.MAX_ARRAY_LENGTH)
  }
}

module.exports = (initialArray, comparedArray) => {
  validateArrays(initialArray, comparedArray)
  let uniquesChunk = []
  const outputArr = []

  comparedArray.forEach(comparedElement => {
    initialArray.forEach(initialElement => {
      if (comparedElement === initialElement) {
        outputArr.push(initialElement)
      }
    })
  })

  initialArray.forEach(element => {
    if(!comparedArray.includes(element)) {
      uniquesChunk.push(element)
    }
  })

  uniquesChunk = uniquesChunk.sort((a, b) => a - b)
  return [...outputArr, ...uniquesChunk]
}
