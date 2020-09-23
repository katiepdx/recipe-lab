const Log = require('../models/log');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Log
      .insert(req.body)
      .then(recipe => res.send(recipe))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Log
      .find()
      .then(recipes => res.send(recipes))
      .catch(next);
  })

  .get('/:id', (req, res) => {
    Log
      .findById(req.params.id)
      .then(recipe => res.send(recipe));
  })

  .put('/:id', (req, res) => {
    Log
      .update(req.params.id, req.body)
      .then(recipe => res.send(recipe));
  })

  .delete('/:id', (req, res) => {
    Log
      .delete(req.params.id)
      .then(recipe => res.send(recipe));
  });
