const { assert } = require('chai')
const GotApi = require('../../services/GotApi')

describe('500 error for route api/tasks/falsyRoute', () => {
  it('should return a 500 error', async () => {
    try {
      const response = await GotApi.getData('/falsyRoute')
      assert.equal(response.statusCode, 200)   
    } catch (error) {
      assert.equal(error.response.statusCode, 500)  
    }
  })
})