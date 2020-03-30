/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'

const expect = require('chai').expect
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = client.db('test')

module.exports = (app) => {
  app.route('/api/issues/:project')
    .get((req, res) => {
      const project = req.params.project

    })
    .post((req, res) => {
      const project = req.params.project

    })
    .put((req, res) => {
      const project = req.params.project

    })
    .delete((req, res) => {
      const project = req.params.project

    })
}
