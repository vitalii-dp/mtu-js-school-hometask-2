// Problem 5
// Given a sorted array of distinct integers and a target value, return the index if the target is found.
// If not, return the index where it would be if it were inserted in order.

const errors = {
  WRONG_TYPE: 'The input should be an array and a number.',
  EMPTY_ARRAY: 'The array should not be empty.',
  WRONG_ARRAY_VALUE: 'The array should only consist of numbers.',
}

function validateInput(array, target) {
  if (!Array.isArray(array) || !(typeof target === 'number' && Number.isFinite(target))) {
    throw new Error (errors.WRONG_TYPE)
  }
  if (array.length === 0) {
    throw new Error (errors.EMPTY_ARRAY)
  }
  if (array.some(el => typeof el !== 'number' || !Number.isFinite(el))) {
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