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
      name: 'sorting result of arrays [2,3,1,3,2,4,6,7,9,2,19] and [] should be deep equal to [1,2,2,2,3,3,4,6,7,9,19]',
      input: {
        initialArray: [2,3,1,3,2,4,6,7,9,2,19],
        comparedArray: []
      },
      expected: [1,2,2,2,3,3,4,6,7,9,19]
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
        message: 'The input should be an array.'
      }
    },
    {
      name: 'passing not arrays should throw an error',
      input: {
        initialArray: 'array',
        comparedArray: 5
      },
      expected: {
        errorCode: 400,
        message: 'The input should be an array.'
      }
    },
    {
      name: 'empty initial array should throw an error',
      input: {
        initialArray: [],
        comparedArray: [1,2,3]
      },
      expected: {
        errorCode: 400,
        message: 'The initial array should not be empty.'
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
        message: 'The arrays should only consist of positive numbers.'
      }
    },
    {
      name: 'arrays with other values than numbers should throw an error',
      input: {
        initialArray: [NaN,3,4,5,undefined,9,1,15],
        comparedArray: [1,2,3]
      },
      expected: {
        errorCode: 400,
        message: 'The arrays should only consist of numbers.'
      }
    },
    {
      name: 'arrays with length over 1000 should throw an error',
      input: {
        initialArray: Array(1001).fill(2),
        comparedArray: [2,3,6,1,4]
      },
      expected: {
        errorCode: 400,
        message: 'The max array length is 1000.'
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
        message: 'The input should be an array.'
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
        message: 'The input should be an array.'
      }
    },
  ]
}