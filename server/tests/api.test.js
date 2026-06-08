import request from 'supertest';
import app from '../src/app.js';
import { User } from '../src/models/User.js';
import mongoose from 'mongoose';

// Ensure the tests don't connect to production DB. We'll skip DB connection for simple route tests
// or mock it. For this MVP, we will just test the health route which doesn't require DB.

describe('API Health Check', () => {
  it('should return 200 OK on /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('CampusConnect AI X API is running');
  });
});

describe('Auth API (Validation)', () => {
  it('should return 400 Bad Request if login is missing email and password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({});
      
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
  });
});
