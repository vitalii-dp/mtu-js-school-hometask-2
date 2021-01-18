const express = require('express')
const mongoose = require('mongoose')
const app = express()
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const PORT = process.env.PORT || 9090

const loginRoute = require('./routes/login.route')
const logoutRoute = require('./routes/logout.route')
const registerRoute = require('./routes/register.route')
const userInfoRoute = require('./routes/userInfo.route')
const resultsRoute = require('./routes/results.route')

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
  if (req.cookies.isLoggedIn === 'true') {
    next()
  } else {
    res.redirect('/login')
  }
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/register', registerRoute)
app.use('/userInfo', userInfoRoute)
app.use('/results', resultsRoute)

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'))
})

app.use((err, req, res, next) => {
  next(err)
  res.status(500).send(JSON.stringify(err))
})

process.on('uncaughtException', err => {
  console.log('Uncaught exception:', err.message)
})

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})