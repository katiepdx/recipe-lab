const Log = require('../models/log');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Log
      .insert(req.body)
      .then(log => res.send(log))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Log
      .find()
      .then(logs => res.send(logs))
      .catch(next);
  })

  .get('/:id', (req, res) => {
    Log
      .findById(req.params.id)
      .then(log => res.send(log));
  })

  .put('/:id', (req, res) => {
    Log
      .update(req.params.id, req.body)
      .then(log => res.send(log));
  })

  .delete('/:id', (req, res) => {
    Log
      .delete(req.params.id)
      .then(log => res.send(log));
  });
