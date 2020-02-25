/* eslint-disable no-underscore-dangle */
const { describe, after, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const deleteAll = require('../../helper/deleteAll');

chai.use(chaiHttp);

const { expect } = chai;
const newUser = {
  username: 'jap',
  email: 'jap@email.com',
  password: '123456'
};

after(done => deleteAll(done));

describe('TEST USER', () => {
  describe('register a new user', () => {
    const { username, email, password } = newUser;
    it('all form is provided, so it should be ok', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ username, email, password })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.be.a('string');
          expect(res.body).to.have.property('username');
          expect(res.body.username).to.be.a('string');
          expect(res.body.username).to.be.equal(username);
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.be.a('string');
          expect(res.body.email).to.be.equal(email);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');

          done();
        })
        .catch(err => done(err));
    });

    it('email is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal(['Email is required']);

          done();
        })
        .catch(err => done(err));
    });

    it('username is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ email, password })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal(['Username is required']);

          done();
        })
        .catch(err => done(err));
    });

    it('password is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ username, email })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal(['Password is required']);

          done();
        })
        .catch(err => done(err));
    });

    it('email and username are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ password })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal([
            'Username is required',
            'Email is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });

    it('email and password are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ username })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal([
            'Email is required',
            'Password is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });

    it('username and password are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({ email })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal([
            'Username is required',
            'Password is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });

    it('email, username, and password are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/register')
        .send({})
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.an('array');
          expect(res.body.message).to.be.deep.equal([
            'Username is required',
            'Email is required',
            'Password is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });
  });

  describe('user login', () => {
    const { username, email, password } = newUser;
    it('all form is provided, so it should be ok', done => {
      chai
        .request(app)
        .post('/users/login')
        .send({ email, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.be.a('string');
          expect(res.body).to.have.property('username');
          expect(res.body.username).to.be.a('string');
          expect(res.body.username).to.be.equal(username);
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.be.a('string');
          expect(res.body.email).to.be.equal(email);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');

          done();
        })
        .catch(err => done(err));
    });

    it('email is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/login')
        .send({ password })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.be.equal(
            'Requirement not satisfied'
          );

          done();
        })
        .catch(err => done(err));
    });

    it('password is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/login')
        .send({ email })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.be.equal(
            'Requirement not satisfied'
          );

          done();
        })
        .catch(err => done(err));
    });

    it('email & password are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/users/login')
        .send({})
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.be.equal(
            'Requirement not satisfied'
          );

          done();
        })
        .catch(err => done(err));
    });
  });
});
