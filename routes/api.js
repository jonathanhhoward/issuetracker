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

      if (!doc.issue_title || !doc.issue_text || !doc.created_by) {
        return res.send('Missing required fields')
      }

      db.collection(req.params.project)
        .insertOne(doc)
        .then(result => res.json(result.ops[0]))
        .catch(console.error)
    })

    .put((req, res) => {
      const {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open
      } = req.body

      if (!_id) return res.send('_id required')

      const updates = {}
      if (issue_title) updates.issue_title = issue_title
      if (issue_text) updates.issue_text = issue_text
      if (created_by) updates.created_by = created_by
      if (assigned_to) updates.assigned_to = assigned_to
      if (status_text) updates.status_text = status_text
      if (open === 'false') updates.open = false

      if (!Object.keys(updates).length) return res.send('no updated field sent')

      updates.updated_on = (new Date()).toJSON()

      db.collection(req.params.project)
        .updateOne({ _id: ObjectId(_id) }, { $set: updates })
        .then(() => res.send('successfully updated'))
        .catch(() => res.send(`could not update _id: ${_id}`))
    })

    .delete((req, res) => {
      const project = req.params.project

    })
}
