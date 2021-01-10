module.exports = {
  positiveFixtures: [
    {
      name: '121 should be equal to true',
      input: 121,
      expected: true
    },
    {
      name: '56 should be equal to false',
      input: 56,
      expected: false
    },
    {
      name: '"159511" should be equal to false',
      input: "159511",
      expected: false
    },
    {
      name: '"55355" should be equal to true',
      input: "55355",
      expected: true
    },
    {
      name: '0 should be equal to true',
      input: 0,
      expected: true
    },
    {
      name: '(2 ** 31 - 1) should be equal to false',
      input: 2 ** 31 - 1,
      expected: false
    },
    {
      name: '(-2) ** 31 should be equal to false',
      input: (-2) ** 31,
      expected: false
    },
  ],
  negativeFixtures: [
    {
      name: '2 ** 31 should throw an error',
      input: 2 ** 31,
      expected: {
        errorCode: 400,
        message: 'The input is out of range.'
      }
    },
    {
      name: '((-2) ** 31 - 1) should throw an error',
      input: (-2) ** 31 - 1,
      expected: {
        errorCode: 400,
        message: 'The input is out of range.'
      }
    },
    {
      name: 'array value should throw an error',
      input: [121],
      expected: {
        errorCode: 400,
        message: 'The input should be a number.'
      }
    },
    {
      name: 'object value should throw an error',
      input: {number: 121},
      expected: {
        errorCode: 400,
        message: 'The input should be a number.'
      }
    },
    {
      name: 'boolean should throw an error',
      input: true,
      expected: {
        errorCode: 400,
        message: 'The input should be a number.'
      }
    },
    {
      name: 'empty string should throw an error',
      input: '',
      expected: {
        errorCode: 400,
        message: 'The input should be a number.'
      }
    },
    // {
    //   name: 'bigInt should throw an error',
    //   input: 1n,
    //   expected: {
    //     errorCode: 400,
    //     message: 'The input should be a number.'
    //   }
    // },
  ]
}