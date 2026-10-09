const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const request = require('supertest');
const { app, connectDB } = require('../server');

async function setupDatabase() {
  await connectDB();
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
}

test.after(async () => {
  await mongoose.disconnect();
});

test('POST /api/users creates a user', async () => {
  await setupDatabase();

  const response = await request(app)
    .post('/api/users')
    .send({ name: 'Test User', email: 'testuser@example.com' });

  assert.equal(response.status, 201);
  assert.equal(response.body.success, true);
  assert.match(response.body.data.email, /example.com/);
});

test('POST /api/posts creates a post with a valid user reference', async () => {
  await setupDatabase();

  const userResponse = await request(app)
    .post('/api/users')
    .send({ name: 'Post Creator', email: 'postcreator@example.com' });

  const postResponse = await request(app)
    .post('/api/posts')
    .send({
      title: 'Schema reference post',
      content: 'This post references a user by ObjectId.',
      user: userResponse.body.data._id,
    });

  assert.equal(postResponse.status, 201);
  assert.equal(postResponse.body.success, true);
  assert.equal(postResponse.body.data.user.name, 'Post Creator');
});

test('GET /api/posts returns populated user details', async () => {
  await setupDatabase();

  const userResponse = await request(app)
    .post('/api/users')
    .send({ name: 'Populated User', email: 'populate@example.com' });

  await request(app)
    .post('/api/posts')
    .send({
      title: 'Populated example',
      content: 'Should include user details in the result.',
      user: userResponse.body.data._id,
    });

  const response = await request(app).get('/api/posts');

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(Array.isArray(response.body.data));
  assert.ok(response.body.data.some((post) => post.user && post.user.email === 'populate@example.com'));
});

test('POST /api/posts rejects invalid or missing user IDs', async () => {
  await setupDatabase();

  const invalidResponse = await request(app)
    .post('/api/posts')
    .send({
      title: 'Bad user',
      content: 'Missing user ID test',
      user: 'invalid-id',
    });

  assert.equal(invalidResponse.status, 400);

  const missingUserResponse = await request(app)
    .post('/api/posts')
    .send({
      title: 'Missing user',
      content: 'User not provided',
    });

  assert.equal(missingUserResponse.status, 400);
});
