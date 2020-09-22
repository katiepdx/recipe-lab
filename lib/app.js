const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/recipes', require('./controllers/recipes'));

// app.put('/api/v1/recipes/:id', (req, res) => {
//   Recipe
//     .update(req.params.id, req.body)
//     .then(recipe => res.send(recipe));
// });

// app.delete('/api/v1/recipes/:id', (req, res) => {
//   Recipe
//     .delete(req.params.id)
//     .then(recipe => res.send(recipe));
// });

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
