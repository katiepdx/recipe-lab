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
  });
