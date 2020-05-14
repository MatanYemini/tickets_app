import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  try {
    return await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  } catch (error) {
    console.log(error);
  }
});

it('returns a 400 on bad email for signup', async () => {
  try {
    return await request(app)
      .post('/api/users/signup')
      .send({
        email: 'testasdtest.com',
        password: 'password',
      })
      .expect(400);
  } catch (error) {
    console.log(error);
  }
});

it('returns a 400 on bad password for signup', async () => {
  try {
    return await request(app)
      .post('/api/users/signup')
      .send({
        email: 'testasd@test.com',
        password: 'p',
      })
      .expect(400);
  } catch (error) {
    console.log(error);
  }
});

it('returns a 400 on missing email or password for signup', async () => {
  try {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com' })
      .expect(400);
    await request(app)
      .post('/api/users/signup')
      .send({ password: 'password' })
      .expect(400);
  } catch (error) {
    console.log(error);
  }
});

it('returns a 400 on missing email and password for signup', async () => {
  try {
    await request(app).post('/api/users/signup').send({}).expect(400);
  } catch (error) {
    console.log(error);
  }
});

it('disallows duplicate emails', async () => {
  try {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  } catch (error) {
    console.log(error);
  }
});
