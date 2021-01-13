const { brackets: errors} = require('../../services/tasks/errors')

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
        message: errors.EMPTY_STRING
      }
    },
    {
      name: 'not a string value should throw an error',
      input: 5,
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'not a string value should throw an error',
      input: [],
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'not a string value should throw an error',
      input: {brackets: '()'},
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'null should throw an error',
      input: null,
      expected: {
        errorCode: 400,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'wrong characters should throw an error',
      input: '!()!',
      expected: {
        errorCode: 400,
        message: errors.WRONG_CHARACTERS
      }
    },
    {
      name: 'wrong characters should throw an error',
      input: '()'.repeat(53),
      expected: {
        errorCode: 400,
        message: errors.MAX_LENGTH
      }
    },
  ]
}