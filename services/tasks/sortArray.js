// Problem 4
// Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
// Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. 
// Elements that don't appear in arr2 should be placed at the end of arr1 in ascending order.

const errors = {
  WRONG_TYPE: 'The input should be an array.',
  EMPTY_ARRAY: 'The initial array should not be empty.',
  NEGATIVE_VALUE: 'The arrays should only consist of positive numbers.',
  WRONG_ARRAY_VALUE: 'The arrays should only consist of numbers.',
  MAX_ARRAY_LENGTH: 'The max array length is 1000.'
}

function validateArrays(initialArray, comparedArray) {
  if (!Array.isArray(initialArray) || !Array.isArray(comparedArray)) {
    throw new Error (errors.WRONG_TYPE)
  }
 if (initialArray.length === 0) {
    throw new Error(errors.EMPTY_ARRAY)
  }
  if (initialArray.some(el => typeof el !== 'number' || !Number.isFinite(el))) {
    throw new Error(errors.WRONG_ARRAY_VALUE)
  }
  if (comparedArray.some(el => typeof el !== 'number' || !Number.isFinite(el))) {
    throw new Error(errors.WRONG_ARRAY_VALUE)
  }
  if (initialArray.some(el => el < 0) || comparedArray.some(el => el < 0)) {
    throw new Error(errors.NEGATIVE_VALUE)
  }
  if (initialArray.length > 1000 || comparedArray.length > 1000) {
    throw new Error(errors.MAX_ARRAY_LENGTH)
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
