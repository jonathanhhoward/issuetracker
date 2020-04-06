/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', function () {
  const route = '/api/issues/test'

  suite('POST /api/issues/{project} => object with issue data', function () {
    test('Every field filled in', function (done) {
      const issue = {
        issue_title: 'Title',
        issue_text: 'Text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      }

      chai.request(server)
        .post(route)
        .send(issue)
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.strictEqual(res.body.issue_title, issue.issue_title)
          assert.strictEqual(res.body.issue_text, issue.issue_text)
          assert.strictEqual(res.body.created_by, issue.created_by)
          assert.strictEqual(res.body.assigned_to, issue.assigned_to)
          assert.strictEqual(res.body.status_text, issue.status_text)
          done()
        })
    })

    test('Required fields filled in', function (done) {
      const issue = {
        issue_title: 'Title',
        issue_text: 'Text',
        created_by: 'Functional Test - Required fields filled in',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post(route)
        .send(issue)
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.strictEqual(res.body.issue_title, issue.issue_title)
          assert.strictEqual(res.body.issue_text, issue.issue_text)
          assert.strictEqual(res.body.created_by, issue.created_by)
          assert.strictEqual(res.body.assigned_to, issue.assigned_to)
          assert.strictEqual(res.body.status_text, issue.status_text)
          done()
        })
    })

    test('Missing required fields', function (done) {
      const issue = {
        issue_title: '',
        issue_text: 'Text',
        created_by: 'Functional Test - Missing required fields',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post(route)
        .send(issue)
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.strictEqual(res.text, 'Missing required fields')
          done()
        })
    })
  })

  suite('PUT /api/issues/{project} => text', function () {
    test('No body', function (done) {
      const issue = {
        issue_title: 'Title',
        issue_text: 'Text',
        created_by: 'Functional Test - No body',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post(route)
        .send(issue)
        .end(function (err, res) {
          if (err) return done(err)

          const update = {
            _id: res.body._id,
            issue_title: '',
            issue_text: '',
            created_by: '',
            assigned_to: '',
            status_text: ''
          }

          chai.request(server)
            .put(route)
            .send(update)
            .end(function (err, res) {
              if (err) return done(err)
              assert.strictEqual(res.status, 200)
              assert.strictEqual(res.text, 'no updated field sent')
              done()
            })
        })
    })

    test('One field to update', function (done) {
      const issue = {
        issue_title: 'Title',
        issue_text: 'Text',
        created_by: 'Functional Test - One field to update',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post(route)
        .send(issue)
        .end(function (err, res) {
          if (err) return done(err)

          const update = {
            _id: res.body._id,
            issue_title: '',
            issue_text: 'Blob',
            created_by: '',
            assigned_to: '',
            status_text: ''
          }

          chai.request(server)
            .put(route)
            .send(update)
            .end(function (err, res) {
              if (err) return done(err)
              assert.strictEqual(res.status, 200)
              assert.strictEqual(res.text, 'successfully updated')
              done()
            })
        })
    })

    test('Multiple fields to update', function (done) {
      const issue = {
        issue_title: 'Title',
        issue_text: 'Text',
        created_by: 'Functional Test - Multiple fields to update',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post(route)
        .send(issue)
        .end(function (err, res) {
          if (err) return done(err)

          const update = {
            _id: res.body._id,
            issue_title: '',
            issue_text: 'Blob',
            created_by: '',
            assigned_to: 'Bob',
            status_text: ''
          }

          chai.request(server)
            .put(route)
            .send(update)
            .end(function (err, res) {
              if (err) return done(err)
              assert.strictEqual(res.status, 200)
              assert.strictEqual(res.text, 'successfully updated')
              done()
            })
        })
    })
  })

  suite('GET /api/issues/{project} => Array of objects with issue data', function () {
    test('No filter', function (done) {
      chai.request(server)
        .get(route)
        .query({})
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.isArray(res.body)
          assert.property(res.body[0], 'issue_title')
          assert.property(res.body[0], 'issue_text')
          assert.property(res.body[0], 'created_on')
          assert.property(res.body[0], 'updated_on')
          assert.property(res.body[0], 'created_by')
          assert.property(res.body[0], 'assigned_to')
          assert.property(res.body[0], 'open')
          assert.property(res.body[0], 'status_text')
          assert.property(res.body[0], '_id')
          done()
        })
    })

    test('One filter', function (done) {
      const query = { issue_text: 'Blob' }

      chai.request(server)
        .get(route)
        .query(query)
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.isArray(res.body)
          res.body.forEach((obj) => {
            assert.strictEqual(obj.issue_text, query.issue_text)
          })
          done()
        })
    })

    test('Multiple filters (test for multiple fields you know will be in the db for a return)', function (done) {
      const query = {
        issue_text: 'Blob',
        assigned_to: 'Bob'
      }

      chai.request(server)
        .get(route)
        .query(query)
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.isArray(res.body)
          res.body.forEach((obj) => {
            assert.strictEqual(obj.issue_text, query.issue_text)
            assert.strictEqual(obj.assigned_to, query.assigned_to)
          })
          done()
        })
    })
  })

  suite('DELETE /api/issues/{project} => text', function () {
    test('No _id', function (done) {
      chai.request(server)
        .delete(route)
        .send({ _id: '' })
        .end(function (err, res) {
          if (err) return done(err)
          assert.strictEqual(res.status, 200)
          assert.strictEqual(res.text, '_id error')
          done()
        })
    })

    test.skip('Valid _id', function (done) {

    })
  })
})
