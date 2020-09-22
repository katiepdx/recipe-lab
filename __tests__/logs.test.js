const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
// const Log = require('../lib/models/log');
const Recipe = require('../lib/models/recipe');

describe('Log model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a log for a recipe', async() => {
    await Promise.all([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ].map(recipe => Recipe.insert(recipe)));
    
    return request(app)
      .post('/api/v1/logs')
      .send(({
        date_of_event: 'Sept 22, 2020',
        notes: 'notes',
        rating: 5,
        recipe_id: '1'
      }))
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          date_of_event: 'Sept 22, 2020',
          notes: 'notes',
          rating: 5,
          recipe_id: '1'
        });
      });
  });

  it('reads all logs for recipes', async() => {
    await Promise.all([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ].map(recipe => Recipe.insert(recipe)));
    
    return request(app)
      .post('/api/v1/logs')
      .send(({
        date_of_event: 'Sept 22, 2020',
        notes: 'notes',
        rating: 5,
        recipe_id: '1'
      }))
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          date_of_event: 'Sept 22, 2020',
          notes: 'notes',
          rating: 5,
          recipe_id: '1'
        });
      });
  });
});
