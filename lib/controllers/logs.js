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
  });
