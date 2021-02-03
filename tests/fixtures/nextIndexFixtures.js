const { nextIndex: errors} = require('../../services/tasks/errors')

module.exports = {
  positiveFixtures: [
    {
      name: '[1, 3, 5, 6] and 5 should be equal to 2',
      input: {
        nums: [1, 3, 5, 6],
        target: 5
      },
      expected: 2
    },
    {
      name: '[1, 3, 5, 6] and 7 should be equal to 4',
      input: {
        nums: [1, 3, 5, 6],
        target: 7
      },
      expected: 4
    },
    {
      name: '[1, 3, 5, 6] and -5 should be equal to 0',
      input: {
        nums: [1, 3, 5, 6],
        target: -5
      },
      expected: 0
    },
    {
      name: '[] and 5 should be equal to 0',
      input: {
        nums: [],
        target: 5
      },
      expected: 0
    }
  ],
  negativeFixtures: [
    {
      name: 'passing wrong types should throw an error',
      input: {
        nums: [1,2,3,4,5],
        target: 'string'
      },
      expected: {
        errorCode: 422,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'passing wrong types should throw an error',
      input: {
        nums: '1,2,3,4',
        target: 5
      },
      expected: {
        errorCode: 422,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'float target should throw an error',
      input: {
        nums: [1,2,3,4,5],
        target: 5.5
      },
      expected: {
        errorCode: 422,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'array with other values than number should throw an error',
      input: {
        nums: [1,2,3,4,'5'],
        target: 5
      },
      expected: {
        errorCode: 422,
        message: errors.WRONG_ARRAY_VALUE
      }
    },
    {
      name: 'null values should throw a parse error',
      input: {
        nums: [1,2,3,4,5],
        target: null
      },
      expected: {
        errorCode: 400,
        message: 'Could not parse input'
      }
    },
    {
      name: 'undefined values should throw a parse error',
      input: {
        nums: [1,2,3,4,5],
        target: undefined
      },
      expected: {
        errorCode: 400,
        message: 'Could not parse input'
      }
    },
    {
      name: 'Infinity should throw a parse error',
      input: {
        nums: [1,2,3,4,5],
        target: Infinity
      },
      expected: {
        errorCode: 400,
        message: 'Could not parse input'
      }
    },
    {
      name: 'unsorted array should throw an error',
      input: {
        nums: [1,2,3,5,4],
        target: 6
      },
      expected: {
        errorCode: 422,
        message: errors.UNSORTED_ARRAY
      }
    },
    {
      name: 'duplicate values in array should throw an error',
      input: {
        nums: [1,2,3,3,4,5],
        target: 6
      },
      expected: {
        errorCode: 422,
        message: errors.ARRAY_HAS_DUPLICATE_VALUES
      }
    },
    {
      name: 'float in array should throw an error',
      input: {
        nums: [1,2,3,3.5,4,5],
        target: 6
      },
      expected: {
        errorCode: 422,
        message: errors.WRONG_ARRAY_VALUE
      }
    },
  ]
}