'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const expect = require('chai').expect
const cors = require('cors')
const helmet = require('helmet')

const apiRoutes = require('./routes/api.js')
const fccTestingRoutes = require('./routes/fcctesting.js')
const runner = require('./test-runner')

const app = express()

app.use(helmet())

app.use('/public', express.static(process.cwd() + '/public'))

app.use(cors({ origin: '*' })) //For FCC testing purposes only

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Sample front-end
app.route('/:project/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/issue.html')
  })

//Index page (static HTML)
app.route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html')
  })

//For FCC testing purposes
fccTestingRoutes(app)

//Routing for API
apiRoutes(app)

//404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found')
})

//Start our server and tests!
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...')
    setTimeout(() => {
      try {
        runner.run()
      } catch (err) {
        console.error('Tests are not valid:\n', err)
      }
    }, 3500)
  }
})

module.exports = app //for testing
