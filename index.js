const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3000

const results = require('./resultData.json')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use((req, res, next) => {
  res.header('Content-Type','application/json');
  next();
});

app.route('/results')
  .get((req, res) => {
    const topResults = sortTopResults(results)
    res.send(JSON.stringify(topResults))
  })
  .post((req, res) => {
    const updatedResults = [...results, req.body]
    fs.writeFileSync('./resultData.json', JSON.stringify(updatedResults))
    const topResults = sortTopResults(updatedResults)
    res.send(JSON.stringify(topResults))
  })
  .delete((req, res) => {
    fs.writeFileSync('./resultData.json', JSON.stringify([]))
    res.send(JSON.stringify(results))
  })

app.use((req, res) => {
  res.header('Content-Type','text/html')
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'))
})

function sortTopResults(data) {
  const sortedResults = data.sort((a, b) => b.score - a.score)
  return sortedResults.slice(0, 10)
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})