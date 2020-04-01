/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'

const expect = require('chai').expect
const ObjectId = require('mongodb').ObjectID

module.exports = (app, db) => {
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
