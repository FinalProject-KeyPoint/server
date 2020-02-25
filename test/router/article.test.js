/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const { describe, after, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const deleteAll = require('../../helper/deleteAll');

chai.use(chaiHttp);
after(done => {
  deleteAll(done);
});

const { expect } = chai;
const newUser = {
  username: 'markus',
  email: 'markus@email.com',
  password: '123456',
  token: null
};
const newArticle = {
  articleId: null,
  title:
    'Mahfud Ungkap 2 Ancaman Kedaulatan Indonesia Berdasarkan Analisis Prabowo',
  url:
    'https://nasional.kompas.com/read/2020/02/21/13444071/mahfud-ungkap-2-ancaman-kedaulatan-indonesia-berdasarkan-analisis-prabowo',
    // YANG INI KENAPA JSON STRINGIFY??
  keyPoint: [
    'Mahfud juga menyebut hal tersebut ancaman terhadap teritori Indonesia.',
    'Pertama, kata dia, ancaman di Laut Natuna Utara atau Laut China Selatan.',
    'Dia pun mengingatkan ancaman China tidak bisa dihadapi dengan adu kekuatan.',
    'Secara hitungan matematis, jika perang fisik dengan China terjadi, dipastikan Indonesia akan kalah.',
    '"Karena di situ ada klaim dari China yang di dalam konteks hukum internasional itu tidak ada.'
  ]
};

describe('ARTICLE TEST', function(){
  this.timeout(5000)
  const { username, email, password } = newUser;
  it('register a new user', done => {
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

        // store token for later use
        newUser.token = res.body.token;

        done();
      })
      .catch(err => done(err));
  });

  describe('create a new article', () => {
    const { title, url, keyPoint } = newArticle;
    describe('check token', () => {
      it('all form (and token) is provided, so it should be ok', done => {
        chai
          .request(app)
          .post('/articles')
          .send({ title, url, keyPoint })
          .set('token', newUser.token)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body._id).to.be.a('string');
            expect(res.body).to.have.property('title');
            expect(res.body.title).to.be.a('string');
            expect(res.body.title).to.be.equal(title);
            expect(res.body).to.have.property('url');
            expect(res.body.url).to.be.a('string');
            expect(res.body.url).to.be.equal(url);
            expect(res.body).to.have.property('keyPoint');
            expect(res.body.keyPoint).to.be.an('array');
            expect(res.body.keyPoint).to.be.deep.equal(keyPoint);

            // store article id for later use
            newArticle.articleId = res.body._id;

            done();
          })
          .catch(err => done(err));
      });

      it('all form is provided, but no token, so it should be error', done => {
        chai
          .request(app)
          .post('/articles')
          .send({ title, url, keyPoint })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('errName');
            expect(res.body.errName).to.be.a('string');
            expect(res.body.errName).to.be.equal('JsonWebTokenError');
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.be.a('number');
            expect(res.body.status).to.be.equal(400);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.be.equal('jwt must be provided');

            done();
          })
          .catch(err => done(err));
      });
    });

    it('title is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
        .send({ url, keyPoint })
        .then(res => {
          console.log(res.body);
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('ValidationError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal(['Title is required']);

          done();
        })
        .catch(err => done(err));
    });

    it('url is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
        .send({ title, keyPoint })
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
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal(['Url is required']);

          done();
        })
        .catch(err => done(err));
    });

    it('keyPoint is not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
        .send({ url, title })
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
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal(['Keypoint is required']);

          done();
        })
        .catch(err => done(err));
    });

    it('title and url are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
        .send({ keyPoint })
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
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal([
            'Url is required',
            'Title is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });

    it('title and keyPoint are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
        .send({ url })
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
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal([
            'Title is required',
            'Keypoint is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });

    it('url and keyPoint are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
        .send({ title })
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
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal([
            'Url is required',
            'Keypoint is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });

    it('title, url, and keyPoint are not provided, so it should be error', done => {
      chai
        .request(app)
        .post('/articles')
        .set('token', newUser.token)
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
          expect(res.body.message).to.be.a('array');
          expect(res.body.message).to.be.deep.equal([
            'Url is required',
            'Title is required',
            'Keypoint is required'
          ]);

          done();
        })
        .catch(err => done(err));
    });
  });

  describe('delete an article', () => {
    const { title, url, keyPoint } = newArticle;
    it('token is not provided, so it should be error', done => {
      chai
        .request(app)
        .delete(`/articles/${newArticle.articleId}`)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errName');
          expect(res.body.errName).to.be.a('string');
          expect(res.body.errName).to.be.equal('JsonWebTokenError');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.be.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.be.equal('jwt must be provided');

          done();
        })
        .catch(err => done(err));
    });

    it('articleId is not provided, so it should be error', done => {
      chai
        .request(app)
        .delete(`/articles/`)
        .set('token', newUser.token)
        .then(res => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object').that.is.empty;
          done();
        })
        .catch(err => done(err));
    });

    it('articleId and token is provided, so it should be ok', done => {
      chai
        .request(app)
        .delete(`/articles/${newArticle.articleId}`)
        .set('token', newUser.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.be.a('string');
          expect(res.body).to.have.property('title');
          expect(res.body.title).to.be.a('string');
          expect(res.body.title).to.be.equal(title);
          expect(res.body).to.have.property('url');
          expect(res.body.url).to.be.a('string');
          expect(res.body.url).to.be.equal(url);
          expect(res.body).to.have.property('keyPoint');
          expect(res.body.keyPoint).to.be.an('array');
          expect(res.body.keyPoint).to.be.deep.equal(keyPoint);

          done()
        })
        .catch(err => done(err));
    });
  });
});
