const got = require('got')
const client = got.extend({
	prefixUrl: 'http://localhost:9090/api/tasks',
  responseType: 'json'
});

async function postData(url, data) {
  return await client.post(url, {
    json: {
      data
    },
  })
}

async function getData(url) {
  return await client.get(url)
}

module.exports = {
  postData,
  getData
}