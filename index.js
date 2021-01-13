const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 9090
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000

const users = require('./users.json')
const results = require('./resultData.json')

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')

app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

function isLoggedIn(req) {
  return req.cookies.isLoggedIn === 'true'
}

app.get('/', (req, res, next) => {
  if (isLoggedIn(req)) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.use(express.static(path.join(__dirname, '/public')))

app.get('/userInfo', (req, res) => {
  if (isLoggedIn(req)) {
    const currentUser = users.find(user => user.name === req.cookies.currentUser)
    const response = {
      topResult: currentUser.topResult,
      userName: currentUser.name
    }
    res.send(JSON.stringify(response))
  } else {
    res.redirect('/login')
  }
})


app.get('/login', (req, res) => {
  if (isLoggedIn(req)) {
    return res.redirect('/')
  } else {
    res.render('loginPage.ejs')
  }
})

app.post('/login', (req, res) => {
  if (!users.find(user => user.email === req.body.email)) {
    res.render('loginPage.ejs', { error: 'Email not found'})
  } else if (!users.find(user => user.password === req.body.password)) {
    res.render('loginPage.ejs', { error: 'Incorrect password'})
  } else {
    const name = users.find(user => user.email === req.body.email).name
    res.cookie('isLoggedIn', 'true', { maxAge: COOKIE_MAX_AGE })
    .cookie('currentUser', name, { maxAge: COOKIE_MAX_AGE })
    return res.redirect('/')
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('isLoggedIn')
  res.clearCookie('currentUser')
  res.redirect('/login')
})

app.get('/register', (req, res) => {
  if (isLoggedIn(req)) {
    res.redirect('/')
  } else {
    res.send(`
      <h1>Under construction</h1>
      <a href="/login">Back to login page</a>
    `)
  }
})

app.all('/results', (req, res, next) => {
  if (!isLoggedIn(req)) {
    res.redirect('/login')
  } else {
    return next()
  }
})

app.route('/results')
  .get((req, res) => {
    const topResults = sortTopResults(results)
    res.send(JSON.stringify(topResults))
  })
  .post((req, res) => {
    const currentUser = users.find(user => user.name === req.cookies.currentUser)
    if (currentUser.topResult < req.body.score) {
      currentUser.topResult = req.body.score
    }
    const result = {
      name: req.body.userInfo.userName,
      score: req.body.score
    }
    const updatedResults = [...results, result]
    try {
      fs.writeFileSync('./resultData.json', JSON.stringify(updatedResults))
      fs.writeFileSync('./users.json', JSON.stringify(users))
      const response = {
        topResults: sortTopResults(updatedResults),
        topScore: currentUser.topResult
      }
      res.send(JSON.stringify(response))
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
  .delete((req, res) => {
    try {
      const filteredResults = results.filter(result => result.name !== req.cookies.currentUser)
      fs.writeFileSync('./resultData.json', JSON.stringify(filteredResults))
      res.send(JSON.stringify(filteredResults)) 
    } catch (error) {
      res.send(error.message)
    }
  })

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

function sortTopResults(data) {
  const sortedResults = data.sort((a, b) => b.score - a.score)
  return sortedResults.slice(0, 10)
}

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`)
})