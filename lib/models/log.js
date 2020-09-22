const pool = require('../utils/pool');

// tracks when the recipe is used 
module.exports = class Log {
  id;
  date_of_event;
  notes;
  rating;
  recipe_id;

  constructor(row) {
    this.id = row.id;
    this.date_of_event = row.date_of_event;
    this.notes = row.notes;
    this.rating = row.rating;
    this.recipe_id = row.recipe_id;
  }

  // METHODS
  // creates a log and with recipeId, dateOfEvent, notes, and rating
  static async insert(logs) {
    const { rows } = await pool.query(
      'INSERT into logs (date_of_event, notes, rating, recipe_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [logs.date_of_event, logs.notes, logs.rating, logs.recipe_id]
    );

    return new Log(rows[0]);
  }
};
