const Recipe = require('../models/recipe');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Recipe
      .insert(req.body)
      .then(recipe => res.send(recipe))
      .catch(next);
  });
