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

suite('Functional Tests', () => {
  suite('POST /api/issues/{project} => object with issue data', () => {
    test('Every field filled in', (done) => {
      const testObj = {
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      }

      chai.request(server)
        .post('/api/issues/test')
        .send(testObj)
        .end((err, res) => {
          assert.strictEqual(res.status, 200)
          assert.strictEqual(res.body.issue_title, testObj.issue_title)
          assert.strictEqual(res.body.issue_text, testObj.issue_text)
          assert.strictEqual(res.body.created_by, testObj.created_by)
          assert.strictEqual(res.body.assigned_to, testObj.assigned_to)
          assert.strictEqual(res.body.status_text, testObj.status_text)
          done()
        })
    })

    test('Required fields filled in', (done) => {
      const testObj = {
        issue_title: 'Title',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post('/api/issues/test')
        .send(testObj)
        .end((err, res) => {
          assert.strictEqual(res.status, 200)
          assert.strictEqual(res.body.issue_title, testObj.issue_title)
          assert.strictEqual(res.body.issue_text, testObj.issue_text)
          assert.strictEqual(res.body.created_by, testObj.created_by)
          assert.strictEqual(res.body.assigned_to, testObj.assigned_to)
          assert.strictEqual(res.body.status_text, testObj.status_text)
          done()
        })
    })

    test('Missing required fields', (done) => {
      const testObj = {
        issue_title: '',
        issue_text: 'text',
        created_by: 'Functional Test - Every field filled in',
        assigned_to: '',
        status_text: ''
      }

      chai.request(server)
        .post('/api/issues/test')
        .send(testObj)
        .end((err, res) => {
          assert.strictEqual(res.status, 400)
          assert.strictEqual(res.body.error, 'Missing required fields')
          done()
        })
    })
  })

  suite('PUT /api/issues/{project} => text', () => {
    test.skip('No body', (done) => {

    })

    test.skip('One field to update', (done) => {

    })

    test.skip('Multiple fields to update', (done) => {

    })
  })

  suite('GET /api/issues/{project} => Array of objects with issue data', () => {
    test.skip('No filter', (done) => {
      chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end((err, res) => {
          assert.equal(res.status, 200)
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

    test.skip('One filter', (done) => {

    })

    test.skip('Multiple filters (test for multiple fields you know will be in the db for a return)', (done) => {

    })
  })

  suite('DELETE /api/issues/{project} => text', () => {
    test.skip('No _id', (done) => {

    })

    test.skip('Valid _id', (done) => {

    })
  })
})
