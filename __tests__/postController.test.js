const postController = require ('../controllers/postController')
const Post = require('../models/post')

describe('postController', () => {
  let postIds = [];
  describe('posts_post', () => {
    it('makes a new post', async() => {
      const post1 = new Post({
        title: 'Test Post 1', 
        content: 'Content 1', 
        datewritten: Date.now(), 
        datepublished: Date.now()
      });

      const post2 = new Post({
        title: 'Test Post 2', 
        content: 'Content 2', 
        datewritten: Date.now(), 
        datepublished: Date.now()
      });

      const post3 = new Post({
        title: 'Test Post 3', 
        content: 'Content 3',
        datewritten: Date.now(), 
        datepublished: Date.now()
      });

      let req = {body: post1};
      let res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      await postController.posts_post(req, res);
      postIds.push(res.json.mock.calls[0][0]._id);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post 1', 
          content: 'Content 1', 
        })
      );

      req = {body: post2};
      res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      await postController.posts_post(req, res);
      postIds.push(res.json.mock.calls[0][0]._id);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post 2', 
          content: 'Content 2', 
        })
      );

      req = {body: post3};
      res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      await postController.posts_post(req, res);
      postIds.push(res.json.mock.calls[0][0]._id);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post 3', 
          content: 'Content 3',
        })
      );
    });
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
      const postId = postIds[1];
      
      const req = {params: {id: postId}};
      const res = {json: jest.fn()};
      await postController.posts_getOne(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({title: 'Test Post 2', content: 'Content 2'}));
    })
  })
  describe('posts_modify', () => {
    it(`should change post 2's content`, async() => {
      const postId = postIds[1];
      let req = {params: {id: postId}, body: {
        content: 'Content 2 modified'
      }};
      let res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      await postController.posts_modify(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post 2', 
          content: 'Content 2 modified', 
        })
      )
      req = {params: {id: postId}};
      res = {json: jest.fn()};
      await postController.posts_getOne(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post 2', 
          content: 'Content 2 modified'
        })
      );
    })
  })
  describe('posts_delete', () => {
    it('should delete post 2', async() => {
      const postId = postIds[1];
      
      let req = {params: {id: postId}};
      let res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
      await postController.posts_delete(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post 2', 
          content: 'Content 2 modified', 
        })
      )

      req = {};
      res = {json: jest.fn()};
      await postController.posts_getAll(req, res)
      expect(res.json).toHaveBeenCalledWith(expect.not.arrayContaining([
        expect.objectContaining({title: 'Test Post 2', content: 'Content 2 modified' }),
      ]));
    });
  })
});
