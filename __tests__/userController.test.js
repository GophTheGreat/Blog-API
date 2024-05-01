const userController = require ('../controllers/userController');
const User = require('../models/user');
const request = require('supertest');
const app = require('../app');

describe('userController', () => {
  let token;
  describe("users_create", () => {
    it('makes a new user with supertest', async() => {
      const user = {
        username: "testAdmin",
        password: "aAsSdDfF1!",
        confirmPassword: "aAsSdDfF1!",
        admin: true
      }
      const response = await request(app)
        .post('/api/users/')
        .send(user)
        .expect(201);

      const createdUser = await User.findOne({username: "testAdmin"}).exec();
      expect(createdUser).toBeDefined();
      expect(createdUser.username).toEqual("testAdmin");
    });
  });
  describe("users_login", () => {
    it('should give us a token on successful login', async() => {
      const user = {
        username: "testAdmin",
        password: "aAsSdDfF1!"
      }
      
      const loginResponse = await request(app)
        .post('/api/users/login')
        .send(user)
        .expect(200)

      token = loginResponse.body.token

      expect(loginResponse.body.token).toBeTruthy();
    })
  })
  describe("users_logout", () => {
    it('should log us out', async() => {
      const user = {
        username: "testAdmin",
        password: "aAsSdDfF1!"
      }
  
      await request(app)
        .post('/api/users/login')
        .send(user)
        .expect(200)

      await request(app)
        .post('/api/users/logout')
        .expect(200)

      const makeAProtectedPost = await request(app)  
        .post('/api/posts/')
        .set('Authorization', `Bearer ${token}`);

      expect(makeAProtectedPost.status).toBe(401);
    })
  })
});