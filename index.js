const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const crasher = require('crasher')
const PORT = process.env.PORT || 9090

const roman = require('./services/tasks/roman')
const palindrome = require('./services/tasks/palindrome')
const brackets = require('./services/tasks/brackets')
const sortArray = require('./services/tasks/sortArray')
const nextIndex = require('./services/tasks/nextIndex')

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

app.post('/api/tasks/roman', (req, res) => {
  const {input} = req.body
  try {
    const result = roman(input)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

app.post('/api/tasks/palindrome', (req, res) => {
  const {input} = req.body
  try {
    const result = palindrome(input)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

app.post('/api/tasks/brackets', (req, res) => {
  const {input} = req.body
  try {
    const result = brackets(input)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

app.post('/api/tasks/sortArray', (req, res) => {
  const { input: {initialArray, comparedArray} } = req.body
  try {
    const result = sortArray(initialArray, comparedArray)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

app.post('/api/tasks/nextIndex', (req, res) => {
  const { input: {array, target} } = req.body
  try {
    const result = nextIndex(array, target)
    const response = {result}
    res.send(JSON.stringify(response))
  } catch (error) {
    res.status(400).send(JSON.stringify(error.message))
  }
})

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