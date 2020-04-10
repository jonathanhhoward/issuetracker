/*
*
*
*       Complete the API routing below
*
*
*/

'use strict'

const ObjectID = require('mongodb').ObjectID

module.exports = (app, db) => {
  app.route('/api/issues/:project')
    .get((req, res) => {
      db.collection(req.params.project)
        .find(req.query)
        .toArray()
        .then((results) => res.json(results))
        .catch(console.error)
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
        .findOneAndUpdate({ _id: ObjectID(_id) }, { $set: updates })
        .then((result) => {
          result.value
            ? res.send('successfully updated')
            : res.send(`could not update _id: ${_id}`)
        })
        .catch(console.error)
    })

    .delete((req, res) => {
      const _id = req.body._id

      if (!_id) return res.send('_id error')

      db.collection(req.params.project)
        .findOneAndDelete({ _id: ObjectID(_id) })
        .then((result) => {
          result.value
            ? res.send(`deleted ${_id}`)
            : res.send(`could not delete ${_id}`)
        })
        .catch(console.error)
    })
}
