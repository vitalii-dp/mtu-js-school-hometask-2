// Problem 5
// Given a sorted array of distinct integers and a target value, return the index if the target is found.
// If not, return the index where it would be if it were inserted in order.

const { nextIndex: errors} = require('./errors')

function validateInput(array, target) {
  if (!Array.isArray(array) || !Number.isInteger(target)) {
    throw new Error (errors.WRONG_TYPE)
  }
  if (array.length !== new Set(array).size) {
    throw new Error(errors.ARRAY_HAS_DUPLICATE_VALUES)
  }
  if (array.some((el, index, arr) => el > arr[index + 1])) {
    throw new Error(errors.UNSORTED_ARRAY)
  }
  if (array.some(el => typeof el !== 'number' || !Number.isInteger(el))) {
    throw new Error(errors.WRONG_ARRAY_VALUE)
  }
}

module.exports = (array, target) => {
  validateInput(array, target)

  if (array.includes(target)) {
    return array.indexOf(target)
  } else {
    const completedArray = [...array, target]
    completedArray.sort((a, b) => a - b)
    return completedArray.indexOf(target)
  }
}