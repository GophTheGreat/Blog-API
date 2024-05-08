const postController = require ('../controllers/postController');
const Post = require('../models/post');
const User = require('../models/user');
const request = require('supertest');
const app = require('../app');

describe('postController', () => {
  let adminToken;
  let userToken;
  let post2id;
  describe('posts_post', () => {
    beforeAll(async() => {
      let admin = await User.findOne({username: "testAdmin"}).exec()
      //If there's no admin account, create one and log in
      await request(app) 
        .post('/api/users/')
        .send({
          username: "testUser",
          password: "aAsSdDfF1!",
          confirmPassword: "aAsSdDfF1!",
          admin: false
        })
        .expect(201)

      const userResponse = await request(app)
        .post('/api/users/login')
        .send({
          username: "testUser",
          password: "aAsSdDfF1!"
        })
        .expect(200)
      userToken = userResponse.body.token

      if(!admin) {
        console.log('No admin account. Creating')
        admin = {        
          username: "testAdmin",
          password: "aAsSdDfF1!",
          confirmPassword: "aAsSdDfF1!",
          admin: true
        };
        await request(app)
          .post('/api/users/')
          .send(admin)
          .expect(201);
      };
      const adminResponse = await request(app)
        .post('/api/users/login')
        .send({
          username: "testAdmin",
          password: "aAsSdDfF1!",
        })
        .expect(200)
      adminToken = adminResponse.body.token;
    })

    it('makes several new posts', async() => {
      console.log(`My admin token is still: `+adminToken);
      let res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Post 1', 
          content: 'Content 1', 
          datewritten: Date.now(), 
          datepublished: Date.now()
        })
        .expect(201);

      expect(res.body).toEqual(expect.objectContaining({
        title: 'Test Post 1',
        content: 'Content 1'
      }));

      res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Post 2', 
          content: 'Content 2', 
          datewritten: Date.now(), 
          datepublished: Date.now()
        })
        .expect(201);

      post2id = res.body._id;
      console.log(`post 2's title is:`,res.body.title);

      expect(res.body).toEqual(expect.objectContaining({
        title: 'Test Post 2',
        content: 'Content 2'
      }));

      res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Post 3', 
          content: 'Content 3', 
          datewritten: Date.now(), 
          datepublished: Date.now()
        })
        .expect(201);

      expect(res.body).toEqual(expect.objectContaining({
        title: 'Test Post 3',
        content: 'Content 3'
      }));
    });
    it('should prevent a normal user from posting', async() => {
      res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post Fail', 
          content: 'Content Fail', 
          datewritten: Date.now(), 
          datepublished: Date.now()
        })
        .expect(403)
    })
  });
  describe('posts_getAll', () => {
    it('should return all posts', async() => {
      const req = {};
      const res = {json: jest.fn()};

      await postController.posts_getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({title: 'Test Post 1', content: 'Content 1' }),
        expect.objectContaining({title: 'Test Post 2', content: 'Content 2' }),
        expect.objectContaining({title: 'Test Post 3', content: 'Content 3' })
      ]));
    });
  });
  describe('posts_getOne', () => {
    it('should return post 2', async() => {
      console.log(post2id);
      const response = await request(app)
        .get(`/api/posts/${post2id}`)

      console.log('this should be post 2: ', response.body)
      expect(response.body).toEqual(expect.objectContaining({title: 'Test Post 2', content: 'Content 2'}));
    });
  })
  describe('posts_modify', () => {
    it(`should change post 2's content`, async() => {
      await request(app)
        .put(`/api/posts/${post2id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Post 2 modified', 
          content: 'Content 2 modified', 
        })
        .expect(201);

      let response = await Post.findOne({title: "Test Post 2 modified"}).exec();
      expect(response).toEqual(expect.objectContaining({title: 'Test Post 2 modified', content: 'Content 2 modified'}));

    })
    it('should prevent a normal user from modifying', async() => {
      res = await request(app)
        .put(`/api/posts/${post2id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post 2 modified', 
          content: 'Content 2 modified', 
        })
        .expect(403)
    })
  })
  describe('posts_delete', () => {
    it('should prevent a normal user from deleting post 2', async() => {
      res = await request(app)
        .delete(`/api/posts/${post2id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403)
    })
    it('should delete post 2', async() => {
      await request(app)
        .delete(`/api/posts/${post2id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      req = {};
      res = {json: jest.fn()};
      await postController.posts_getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(expect.not.arrayContaining([
        expect.objectContaining({title: 'Test Post 2 modified', content: 'Content 2 modified' }),
      ]));
    });
  })
});
