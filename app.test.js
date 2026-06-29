const request = require('supertest');
const app = require('./app');

beforeEach(() => {
  app.resetCount();
});

describe('GET /', () => {
  it('returns 200 with count in JSON', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 0 });
  });

  it('returns the current count after mutations', async () => {
    await request(app).put('/inc');
    await request(app).put('/inc');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(2);
  });

  it('returns content-type application/json', async () => {
    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});

describe('PUT /inc', () => {
  it('returns 204 with no body', async () => {
    const res = await request(app).put('/inc');
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });

  it('increments count by 1', async () => {
    await request(app).put('/inc');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(1);
  });

  it('increments count multiple times', async () => {
    await request(app).put('/inc');
    await request(app).put('/inc');
    await request(app).put('/inc');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(3);
  });
});

describe('PUT /dec', () => {
  it('returns 204 with no body', async () => {
    const res = await request(app).put('/dec');
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });

  it('decrements count by 1', async () => {
    await request(app).put('/dec');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(-1);
  });

  it('decrements count multiple times', async () => {
    await request(app).put('/dec');
    await request(app).put('/dec');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(-2);
  });

  it('allows count to go negative', async () => {
    await request(app).put('/dec');
    await request(app).put('/dec');
    await request(app).put('/dec');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(-3);
  });
});

describe('PUT /reset', () => {
  it('returns 204 with no body', async () => {
    const res = await request(app).put('/reset');
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });

  it('resets count to 0 after increments', async () => {
    await request(app).put('/inc');
    await request(app).put('/inc');
    await request(app).put('/inc');
    await request(app).put('/reset');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(0);
  });

  it('resets count to 0 after decrements', async () => {
    await request(app).put('/dec');
    await request(app).put('/dec');
    await request(app).put('/reset');
    const res = await request(app).get('/');
    expect(res.body.count).toBe(0);
  });
});

describe('combined operations', () => {
  it('handles a sequence of inc, dec, and reset', async () => {
    await request(app).put('/inc');
    await request(app).put('/inc');
    await request(app).put('/dec');
    let res = await request(app).get('/');
    expect(res.body.count).toBe(1);

    await request(app).put('/reset');
    res = await request(app).get('/');
    expect(res.body.count).toBe(0);
  });

  it('count starts at 0 on fresh state', async () => {
    const res = await request(app).get('/');
    expect(res.body.count).toBe(0);
  });
});

describe('undefined routes', () => {
  it('returns 404 for unknown GET path', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });

  it('returns 404 for unknown PUT path', async () => {
    const res = await request(app).put('/unknown');
    expect(res.status).toBe(404);
  });

  it('returns 404 for POST to /inc', async () => {
    const res = await request(app).post('/inc');
    expect(res.status).toBe(404);
  });

  it('returns 404 for DELETE to /', async () => {
    const res = await request(app).delete('/');
    expect(res.status).toBe(404);
  });
});
