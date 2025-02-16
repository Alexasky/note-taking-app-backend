import request from 'supertest';
import { app } from '../server';
import { pool } from '../config/postgres.config';


let authToken: string;
let userId: number;

beforeAll(async () => {
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });

  authToken = loginRes.body.token;
	userId = loginRes.body.user.id;

});

afterAll(async () => {
  await pool.end();
});

describe('Notes API Tests', () => {
  let noteId: number;

  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/note/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Test Note', content: 'This is a test note', userId: userId });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    noteId = res.body.id; 
  });

  it('should get all notes', async () => {
    const res = await request(app)
      .get(`/api/notes/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a single note by ID', async () => {
    const res = await request(app)
      .get(`/api/note/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(noteId);
  });

  it('should update a note', async () => {
    const res = await request(app)
      .put(`/api/note/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Updated Title', content: 'Updated Content', userId: userId });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should delete a note', async () => {
    const res = await request(app)
      .delete(`/api/note/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(204);
  });
});