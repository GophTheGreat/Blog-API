const userController = require ('../controllers/userController');
const User = require('../models/user');

describe('userController', () => {
  describe("users_create", () => {
    it('makes a new user', async() => {
      const user = {
        username: "testAdmin",
        password: "aAsSdDfF1!",
        confirmPassword: "aAsSdDfF1!",
        admin: true
      }

      const req = {body: user};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      for(const middleware of userController.users_create) {
        await middleware(req, res, jest.fn());
      }

      const createdUser = await User.findOne({username: "testAdmin"}).exec();
      expect(createdUser).toBeDefined();
      expect(createdUser.username).toEqual("testAdmin");
    });
  });
});