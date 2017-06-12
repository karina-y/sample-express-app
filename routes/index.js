(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var db = require('diskdb');
  db = db.connect('server/db', ['messages']);

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Inbox' });
  });

  /* GET message details by ToUserId. */
  router.get('/message/:_id', function(req, res, next) {
    res.render('messageDetail', { title: 'Message', messageCorrespondenceId: req.params._id });
  });

  //API calls
  //get by fromUserId
  router.get('/api/message/:_id', function(req, res) {
    res.json(db.messages.find({FromUserId: parseInt(req.params._id)}));
  });

  //get by toUserId
  router.get('/api/messagesto/:_id', function(req, res) {
    res.json(db.messages.find({ToUserId: parseInt(req.params._id)}));
  });  

  //get by messageCorrespondenceId
  router.get('/api/messagethread/:_id', function(req, res) {
    res.json(db.messages.find({MessageCorrespondenceId: parseInt(req.params._id)}));
  });

  //post
  router.post('/api/message', function(req, res) {
    res.json(db.messages.save(req.body));
  });

  //update by id
  router.put('/api/message', function(req, res) {
    res.json(db.messages.update({
      _id: req.body._id
    }, req.body));
  });

  //delete by id
  router.delete('/api/message/:_id', function(req, res) {
    res.json(db.messages.remove({
      _id: req.params._id
    }));
  });

  module.exports = router;

}());