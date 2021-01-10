module.exports = {
  positiveFixtures: [
    {
      name: '[1, 3, 5, 6] and 5 should be equal to 2',
      input: {
        array: [1, 3, 5, 6],
        target: 5
      },
      expected: 2
    },
    {
      name: '[1, 3, 5, 6] and 7 should be equal to 4',
      input: {
        array: [1, 3, 5, 6],
        target: 7
      },
      expected: 4
    },
    {
      name: '[1, 3, 5, 6] and -5 should be equal to 0',
      input: {
        array: [1, 3, 5, 6],
        target: -5
      },
      expected: 0
    }
  ],
  negativeFixtures: [
    {
      name: 'passing wrong types should throw an error',
      input: {
        array: [1,2,3,4,5],
        target: 'string'
      },
      expected: {
        errorCode: 400,
        message: 'The input should be an array and a number.'
      }
    },
    {
      name: 'passing wrong types should throw an error',
      input: {
        array: '1,2,3,4',
        target: 5
      },
      expected: {
        errorCode: 400,
        message: 'The input should be an array and a number.'
      }
    },
    {
      name: 'passing empty array should throw an error',
      input: {
        array: [],
        target: 5
      },
      expected: {
        errorCode: 400,
        message: 'The array should not be empty.'
      }
    },
    {
      name: 'array with other values than number should throw an error',
      input: {
        array: [1,2,3,4,'5'],
        target: 5
      },
      expected: {
        errorCode: 400,
        message: 'The array should only consist of numbers.'
      }
    },
    {
      name: 'null values should throw an error',
      input: {
        array: [1,2,3,4,5],
        target: null
      },
      expected: {
        errorCode: 400,
        message: 'The input should be an array and a number.'
      }
    },
    {
      name: 'Infinity should throw an error',
      input: {
        array: [1,2,3,4,5],
        target: Infinity
      },
      expected: {
        errorCode: 400,
        message: 'The input should be an array and a number.'
      }
    },
  ]
}