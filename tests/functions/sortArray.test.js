const { assert } = require('chai')
const sortArrayFixtures = require('../fixtures/sortArrayFixtures')
const GotApi = require('../../services/GotApi')

describe('Positive cases for route api/tasks/sortArray', () => {
  sortArrayFixtures.positiveFixtures.forEach(({ name, input, expected }) => {
    it(name, async () => {
      const { body: { result }, statusCode } = await GotApi.postData('sortArray', input)
      assert.isArray(input.initialArray)
      assert.isArray(input.comparedArray)
      assert.deepEqual(result, expected)
      assert.equal(statusCode, 200)
    })
  })
})

describe('Negative cases for route api/tasks/sortArray', () => {
  sortArrayFixtures.negativeFixtures.forEach(({ name, input, expected}) => {
    it(name, async () => {
      try {
        const response = await GotApi.postData('sortArray', input)
        throw new Error('The request should throw an error but it didn\'t.')
      } catch (error) {
        assert.equal(error.response.body, expected.message)
        assert.equal(error.response.statusCode, 400)
      }
    })
  })
})