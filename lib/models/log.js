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
  static async insert(logs) {
    const { rows } = await pool.query(
      'INSERT into logs (date_of_event, notes, rating, recipe_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [logs.date_of_event, logs.notes, logs.rating, logs.recipe_id]
    );

    return new Log(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM logs'
    );

    return rows.map(row => new Log(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM logs WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Log(rows[0]);
  }

  static async update(id, log) {
    const { rows } = await pool.query(
      `UPDATE logs
       SET date_of_event=$1,
           notes=$2,
           rating=$3,
           recipe_id=$4
       WHERE id=$5
       RETURNING *
      `,
      [log.date_of_event, log.notes, log.rating, log.recipe_id, id]
    );

    if(!rows[0]) return null;
    else return new Log(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM logs WHERE id=$1 RETURNING *',
      [id]
    );
    
    if(!rows[0]) return null;
    else return new Log(rows[0]);
  }
};
