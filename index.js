const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const crasher = require('crasher')
const PORT = process.env.PORT || 9090
const TASK_URL = '/api/tasks'

const romanRoute = require('./routes/roman.route')
const palindromeRoute = require('./routes/palindrome.route')
const bracketsRoute = require('./routes/brackets.route')
const sortArrayRoute = require('./routes/sortArray.route')
const nextIndexRoute = require('./routes/nextIndex.route')

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

app.use(TASK_URL, romanRoute)
app.use(TASK_URL, palindromeRoute)
app.use(TASK_URL, bracketsRoute)
app.use(TASK_URL, sortArrayRoute)
app.use(TASK_URL, nextIndexRoute)

app.get('/api/tasks/falsyRoute', crasher)

app.use((req, res) => {
  res.header('Content-Type','text/html')
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'))
})

app.use((err, req, res, next) => {
  next(err)
  res.status(500).send(JSON.stringify(err))
})

process.on('uncaughtException', err => {
  console.log('Uncaught exception:', err.message)
})

function sortTopResults(data) {
  const sortedResults = data.sort((a, b) => b.score - a.score)
  return sortedResults.slice(0, 10)
}

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})