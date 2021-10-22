const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
// beforeEach(async () => {
//   await db.seed.run();
// });
afterAll(async () => {
  await db.destroy();
});

it('sanity check', () => {
  expect(true).not.toBe(false);
});

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });
});


const newUser = { username: "test", password: "1234" };

describe('[POST] /api/auth/register', () => {
    it('returns a 201 created status on successful registration', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send(newUser);
        expect(res.status).toBe(201);
    });
    it('responds with the newly registered user', async () => {
        let res = await request(server)
            .post('/api/auth/register')
            .send({ username: 'test2', password: '1234' });
        expect(res.body).toMatchObject({ user_id: 2, username: 'test2' });
    });
});

describe('[POST] /api/auth/login', () => {
    it('responds with a 200 OK status', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send(newUser);
        expect(res.status).toBe(200);
    });

    it('responds with a 422 if no username or password in payload', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({ username: '', password: '1234' });
        expect(res.status).toBe(422);
    });
});