module.exports = {
  positiveFixtures: [
    {
      name: '"{}" should be equal to true',
      input: '{}',
      expected: true
    },
    {
      name: '"{}()[]" should be equal to true',
      input: '{}()[]',
      expected: true
    },
    {
      name: '"{[()]}" should be equal to true',
      input: '{[()]}',
      expected: true
    },
    {
      name: '"{[}]" should be equal to false',
      input: '{[}]',
      expected: false
    },
    {
      name: '"({}" should be equal to false',
      input: '({}',
      expected: false
    }
  ],
  negativeFixtures: [
    {
      name: 'empty string should throw an error',
      input: '',
      expected: {
        errorCode: 400,
        message: 'The input should not be an empty string.'
      }
    },
    {
      name: 'not a string value should throw an error',
      input: 5,
      expected: {
        errorCode: 400,
        message: 'The input should be a string.'
      }
    },
    {
      name: 'not a string value should throw an error',
      input: [],
      expected: {
        errorCode: 400,
        message: 'The input should be a string.'
      }
    },
    {
      name: 'not a string value should throw an error',
      input: {brackets: '()'},
      expected: {
        errorCode: 400,
        message: 'The input should be a string.'
      }
    },
    {
      name: 'null should throw an error',
      input: null,
      expected: {
        errorCode: 400,
        message: 'The input should be a string.'
      }
    },
    {
      name: 'wrong characters should throw an error',
      input: '!()!',
      expected: {
        errorCode: 400,
        message: 'The input should only have these characters "(", ")", "{", "}", "[", and "]".'
      }
    },
    {
      name: 'wrong characters should throw an error',
      input: '()'.repeat(53),
      expected: {
        errorCode: 400,
        message: 'The max input length is 104.'
      }
    },
  ]
}