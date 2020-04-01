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
      const doc = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: (new Date()).toJSON(),
        updated_on: '',
        open: true
      }
      db.collection(project)
        .insertOne(doc)
        .then(result => res.json(result.ops[0]))
        .catch(console.error)
    })

    .put((req, res) => {
      const project = req.params.project

    })

    .delete((req, res) => {
      const project = req.params.project

    })
}
