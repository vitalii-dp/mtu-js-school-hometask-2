const { assert } = require('chai')
const bracketsFixtures = require('../fixtures/bracketsFixtures')
const GotApi = require('../../services/GotApi')

describe('Positive cases for route api/tasks/brackets', () => {
  bracketsFixtures.positiveFixtures.forEach(({ name, input, expected }) => {
    it(name, async () => {
      const { body: { result }, statusCode } = await GotApi.postData('brackets', input)
      assert.equal(result, expected)
      assert.equal(statusCode, 200)
    })
  })
})

describe('Negative cases for route api/tasks/brackets', () => {
  bracketsFixtures.negativeFixtures.forEach(({ name, input, expected}) => {
    it(name, async () => {
      try {
        const response = await GotApi.postData('brackets', input)
        throw new Error('The request should throw an error but it didn\'t.')
      } catch (error) {
        assert.equal(error.response.body, expected.message)
        assert.equal(error.response.statusCode, expected.errorCode)
      }
    })
  })
})