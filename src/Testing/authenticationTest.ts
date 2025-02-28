/* import express from 'express';
import { authRouter } from '../controllers/authController'; 

const app = express();
app.use(express.json());
app.use('/api/v1/login', authRouter);

describe('POST /api/v1/login', () => {
  it('should return 200 and a JWT token when valid credentials are provided', async () => {
    const validUser = {
      username: 'user@example.com',
      password: '123456',
    };

    const response = await request(app).post('/api/v1/login').send(validUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 when the request body is invalid (missing username or password)', async () => {
    const invalidUser = {
      username: '',  
      password: '',  
    };

    const response = await request(app).post('/api/v1/login').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Username is required.');
    expect(response.body.errors).toContain('Password is required.');
  });

  it('should return 401 when invalid credentials are provided', async () => {
    const invalidCredentials = {
      username: 'user@example.com',
      password: 'notright',  
    };

    const response = await request(app).post('/api/v1/login').send(invalidCredentials);
    npm install

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 500 when an unexpected error occurs', async () => {
    jest.spyOn(AuthService, 'authenticate').mockRejectedValueOnce(new Error('Something went wrong'));

    const validUser = {
      username: 'user1@example.com',
      password: '123456',
    };

    const response = await request(app).post('/api/v1/login').send(validUser);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal server error');
  });
});
*/