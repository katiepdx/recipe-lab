const Recipe = require('../models/recipe');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Recipe
      .insert(req.body)
      .then(recipe => res.send(recipe))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Recipe
      .find()
      .then(recipes => res.send(recipes))
      .catch(next);
  })

  .get('/:id', (req, res) => {
    Recipe
      .findById(req.params.id)
      .then(recipe => res.send(recipe));
  })

  .put('/:id', (req, res) => {
    Recipe
      .update(req.params.id, req.body)
      .then(recipe => res.send(recipe));
  })

  .delete('/:id', (req, res) => {
    Recipe
      .delete(req.params.id)
      .then(recipe => res.send(recipe));
  });
