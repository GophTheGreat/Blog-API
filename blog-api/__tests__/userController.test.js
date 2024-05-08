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

      const user2 = {
        username: "testNormie",
        password: "aAsSdDfF1!",
        confirmPassword: "aAsSdDfF1!",
        admin: false
      }

      await request(app)
        .post('/api/users/')
        .send(user)
        .expect(201);

      await request(app)
        .post('/api/users/')
        .send(user2)
        .expect(201);

      let createdUser = await User.findOne({username: "testAdmin"}).exec();
      expect(createdUser).toBeDefined();
      expect(createdUser.admin).toBe(true)

      createdUser = await User.findOne({username: "testNormie"}).exec();
      expect(createdUser).toBeDefined();
      expect(createdUser.admin).toBe(false)
    });
  });
  describe("users_login", () => {
    it('login should succeed and user receives a token', async() => {
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
});