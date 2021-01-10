const got = require('got')
const BASE_URL = 'http://localhost:9090/api/tasks'

async function postData(url, data) {
  return await got.post(BASE_URL + url, {
    json: {
      input: data
    },
    responseType: 'json'
  })
}

async function getData(url) {
  return await got.get(BASE_URL + url)
}

module.exports = {
  postData,
  getData
}