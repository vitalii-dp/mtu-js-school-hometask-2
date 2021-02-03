const { roman: errors} = require('../../services/tasks/errors')

module.exports = {
  positiveFixtures: [
    {
      name: 'III should be equal to 3',
      input: 'III',
      expected: 3
    },
    {
      name: 'IV should be equal to 4',
      input: 'IV',
      expected: 4
    },
    {
      name: 'IX should be equal to 9',
      input: 'IX',
      expected: 9
    },
    {
      name: 'XIX should be equal to 19',
      input: 'XIX',
      expected: 19
    },
    {
      name: 'XL should be equal to 40',
      input: 'XL',
      expected: 40
    },
    {
      name: 'XCIX should be equal to 99',
      input: 'XCIX',
      expected: 99
    },
    {
      name: 'MCMXCIV should be equal to 1994',
      input: 'MCMXCIV',
      expected: 1994
    },
    {
      name: 'MMMCMXCIX should be equal to 3999',
      input: 'MMMCMXCIX',
      expected: 3999
    },
    {
      name: 'vii should be equal to 7',
      input: 'vii',
      expected: 7
    },
    {
      name: 'XvIII should be equal to 18',
      input: 'XvIII',
      expected: 18
    },
  ],
  negativeFixtures: [
    {
      name: 'IIII should throw an error',
      input: 'IIII',
      expected: {
        errorCode: 422,
        message: errors.WRONG_ROMAN_NUMERAL
      }
    },
    {
      name: 'XXIB should throw an error',
      input: 'XXIB',
      expected: {
        errorCode: 422,
        message: errors.WRONG_ROMAN_NUMERAL
      }
    },
    {
      name: 'number value should throw an error',
      input: 2,
      expected: {
        errorCode: 422,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'array value should throw an error',
      input: [],
      expected: {
        errorCode: 422,
        message: errors.WRONG_TYPE
      }
    },
    {
      name: 'null value should throw a parse error',
      input: null,
      expected: {
        errorCode: 400,
        message: 'Could not parse input'
      }
    },
    {
      name: 'undefined value should throw a parse error',
      input: undefined,
      expected: {
        errorCode: 400,
        message: 'Could not parse input'
      }
    },
    {
      name: 'empty string should throw an error',
      input: '',
      expected: {
        errorCode: 422,
        message: errors.EMPTY_VALUE
      }
    }
  ]
}