const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');

describe('Log model', () => {
  beforeEach(async() => {
    pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    return await Promise.all([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ].map(recipe => Recipe.insert(recipe)));
  });

  it('creates a log for a recipe', async() => {
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
    await request(app)
      .post('/api/v1/logs')
      .send({
        date_of_event: 'Sept 22, 2020',
        notes: 'notes',
        rating: 5,
        recipe_id: '1'
      });
    return await request(app)
      .get('/api/v1/logs')
      .then(res => {
        expect(res.body[0]).toEqual({
          id: expect.any(String),
          date_of_event: 'Sept 22, 2020',
          notes: 'notes',
          rating: 5,
          recipe_id: '1'
        });
      });
  });

  it('gets one log by id', async() => {
    await request(app)
      .post('/api/v1/logs')
      .send({
        date_of_event: 'Sept 22, 2020',
        notes: 'notes',
        rating: 5,
        recipe_id: '1'
      });

    return await request(app)
      .get('/api/v1/logs/1')
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

  it('updates one log by id', async() => {
    // create a log
    await request(app)
      .post('/api/v1/logs')
      .send({
        date_of_event: 'Sept 22, 2020',
        notes: 'notes',
        rating: 5,
        recipe_id: '1'
      });
    
    // update log
    return await request(app)
      .put('/api/v1/logs/1')
      .send({
        date_of_event: 'Sept 22, 2020',
        notes: 'more notes',
        rating: 100,
        recipe_id: '1'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          date_of_event: 'Sept 22, 2020',
          notes: 'more notes',
          rating: 100,
          recipe_id: '1'
        });
      });
  });

  it('deletes one log by id', async() => {
    // create a log
    await request(app)
      .post('/api/v1/logs')
      .send({
        date_of_event: 'Sept 22, 2020',
        notes: 'to delete',
        rating: 100,
        recipe_id: '1'
      });
    
    // delete log
    return await request(app)
      .delete('/api/v1/logs/1')
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          date_of_event: 'Sept 22, 2020',
          notes: 'to delete',
          rating: 100,
          recipe_id: '1'
        });
      });
  });
});
