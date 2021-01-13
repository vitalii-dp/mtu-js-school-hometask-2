const { sortArray: errors} = require('../../services/tasks/errors')

module.exports = {
  positiveFixtures: [
    {
      name: 'sorting result of arrays [2,3,1,3,2,4,6,7,9,2,19] and [2,1,4,3,9,6] should be deep equal to [2,2,2,1,4,3,3,9,6,7,19]',
      input: {
        initialArray: [2,3,1,3,2,4,6,7,9,2,19],
        comparedArray: [2,1,4,3,9,6]
      },
      expected: [2,2,2,1,4,3,3,9,6,7,19]
    },
    {
      name: 'sorting result of arrays [3,4,5,7,1,9] and [3,4,5,7,1,9] should be deep equal to [3,4,5,7,1,9]',
      input: {
        initialArray: [3,4,5,7,1,9],
        comparedArray: [3,4,5,7,1,9]
      },
      expected: [3,4,5,7,1,9]
    },
  ],
  negativeFixtures: [
    {
      name: 'passing not arrays should throw an error',
      input: {
        initialArray: 'array',
        comparedArray: 5
      },
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'empty array should throw an error',
      input: {
        initialArray: [],
        comparedArray: [1,2,3]
      },
      expected: {
        errorCode: 400,
        message: errors.EMPTY_ARRAY
      }
    },
    {
      name: 'empty array should throw an error',
      input: {
        initialArray: [1,1,1,2,3,3],
        comparedArray: []
      },
      expected: {
        errorCode: 400,
        message: errors.EMPTY_ARRAY
      }
    },
    {
      name: 'arrays with negative numbers should throw an error',
      input: {
        initialArray: [-2,3,4,5,2,9,1,15],
        comparedArray: [1,2,-3]
      },
      expected: {
        errorCode: 400,
        message: errors.WRONG_ARRAY_VALUE
      }
    },
    {
      name: 'arrays with float should throw an error',
      input: {
        initialArray: [2,3,4.5,5,2,9,1,15],
        comparedArray: [1,2,3]
      },
      expected: {
        errorCode: 400,
        message: errors.WRONG_ARRAY_VALUE
      }
    },
    {
      name: 'arrays with other values than positive integer numbers should throw an error',
      input: {
        initialArray: [NaN,3,4,5,undefined,9,1,15],
        comparedArray: [1,2,3]
      },
      expected: {
        errorCode: 400,
        message: errors.WRONG_ARRAY_VALUE
      }
    },
    {
      name: 'arrays with length over 1000 should throw an error',
      input: {
        initialArray: Array(1001).fill(2),
        comparedArray: [2]
      },
      expected: {
        errorCode: 400,
        message: errors.MAX_ARRAY_LENGTH
      }
    },
    {
      name: 'null values should throw an error',
      input: {
        initialArray: null,
        comparedArray: [2,3,6,1]
      },
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'undefined values should throw an error',
      input: {
        initialArray: [2,3,3,7,7,7,1,1,5],
        comparedArray: undefined
      },
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'duplicate values in compared array should throw an error',
      input: {
        initialArray: [2,3,3,7,7,7,1,1,5],
        comparedArray: [1,2,2,3]
      },
      expected: {
        errorCode: 400,
        message: errors.COMPARED_ARRAY_HAS_DUPLICATES
      }
    },
    {
      name: 'excess values in compared array should throw an error',
      input: {
        initialArray: [2,3,3,7,7,7,1,1,5],
        comparedArray: [1,2,3,4]
      },
      expected: {
        errorCode: 400,
        message: errors.COMPARED_ARRAY_EXCESS_VALUE
      }
    },
  ]
}