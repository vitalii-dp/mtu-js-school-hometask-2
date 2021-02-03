const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const checkAuth = require('./utils/checkAuth')
const PORT = process.env.PORT || 9090
const routes = require('./routes/routes')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.get('/', (req, res, next) => {
  if (checkAuth(req)) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.use(express.static(path.join(__dirname, 'public')))

// Game routes
app.use('/login', routes.loginRoute)
app.use('/logout', routes.logoutRoute)
app.use('/register', routes.registerRoute)
app.use('/userInfo', routes.userInfoRoute)
app.use('/results', routes.resultsRoute)
app.use('/admin', routes.adminRoute)

// Test routes
app.use('/api/tasks/roman', routes.romanRoute)
app.use('/api/tasks/palindrome', routes.palindromeRoute)
app.use('/api/tasks/brackets', routes.bracketsRoute)
app.use('/api/tasks/sortArray', routes.sortArrayRoute)
app.use('/api/tasks/nextIndex', routes.nextIndexRoute)
app.use('/api/tasks/falsyRoute', routes.falsyRoute)

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'))
})

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message || 'Something went wrong, but it is not your fault. Try again later')
})

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})