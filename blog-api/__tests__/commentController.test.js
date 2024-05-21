"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const blogComment = require('../models/comment');
const commentController = require('../controllers/commentController');
const User = require('../models/user');
const request = require('supertest');
const app = require('../app');
describe('CommentController', () => {
    let adminToken;
    let postId;
    let comment2Id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        let admin = yield User.findOne({ username: "testAdmin" }).exec();
        //If there's no admin account, create one and log in
        if (!admin) {
            console.log('No admin account. Creating');
            admin = {
                username: "testAdmin",
                password: "aAsSdDfF1!",
                confirmPassword: "aAsSdDfF1!",
                admin: true
            };
            yield request(app)
                .post('/api/users/')
                .send(admin)
                .expect(201);
        }
        ;
        const token = yield request(app)
            .post('/api/users/login')
            .send({
            username: "testAdmin",
            password: "aAsSdDfF1!",
        })
            .expect(200);
        adminToken = token.body.token;
        const post = yield request(app)
            .post('/api/posts/')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
            title: 'Comment post',
            content: 'Content',
            datewritten: Date.now(),
            datepublished: Date.now()
        });
        postId = post.body._id;
        console.log(`Comment test post's ID is: `, postId);
        expect(post.body).toEqual(expect.objectContaining({
            title: 'Comment post',
            content: 'Content'
        }));
    }));
    describe('comments_post', () => {
        it('should create 2 new comments', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("postId:", postId);
            let response = yield request(app)
                .post(`/api/posts/${postId}/comments/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                content: 'this is test comment content'
            })
                .expect(201);
            expect(response.body).toEqual(expect.objectContaining({
                content: 'this is test comment content'
            }));
            response = yield request(app)
                .post(`/api/posts/${postId}/comments/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                content: 'this is another test comment content'
            })
                .expect(201);
            //save the comment id for later
            comment2Id = response.body._id;
            expect(response.body).toEqual(expect.objectContaining({
                content: 'this is another test comment content'
            }));
        }));
    });
    describe('comments_getAll', () => {
        it('should list all comments', () => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield request(app)
                .get(`/api/posts/${postId}/comments/`);
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    content: 'this is another test comment content'
                }),
                expect.objectContaining({
                    content: 'this is test comment content'
                })
            ]));
        }));
    });
    describe('comments_getOne', () => {
        it('should get one comment', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(comment2Id);
            let response = yield request(app)
                .get(`/api/posts/${postId}/comments/${comment2Id}`);
            expect(response.body).toEqual(expect.objectContaining({
                content: 'this is another test comment content'
            }));
        }));
    });
    describe('comments_modify', () => {
        it('should modify one comment', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request(app)
                .put(`/api/posts/${postId}/comments/${comment2Id}`)
                .set(`Authorization`, `Bearer ${adminToken}`)
                .send({
                content: 'this is a modified test comment content'
            })
                .expect(200);
            let response = yield request(app)
                .get(`/api/posts/${postId}/comments/${comment2Id}`);
            expect(response.body).toEqual(expect.objectContaining({
                content: 'this is a modified test comment content'
            }));
        }));
    });
    describe('comments_delete', () => {
        it('should delete one comment', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request(app)
                .delete(`/api/posts/${postId}/comments/${comment2Id}`)
                .set(`Authorization`, `Bearer ${adminToken}`)
                .expect(200);
            yield request(app)
                .get(`/api/posts/${postId}/comments/${comment2Id}`)
                .expect(500);
        }));
    });
});
