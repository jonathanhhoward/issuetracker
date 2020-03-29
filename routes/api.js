/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(err => {
  if (err) return console.error(err);
  console.log('Connected to database.');

  const db = client.db('test');

  client.close();
});

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res){
      var project = req.params.project;

    })

    .post(function (req, res){
      var project = req.params.project;

    })

    .put(function (req, res){
      var project = req.params.project;

    })

    .delete(function (req, res){
      var project = req.params.project;

    });

};
