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
const sampleArticle = [
  'Jakarta - Sekjen Kemenag Nur Kholis Setiawan dibebastugaskan sementara dari jabatannya oleh Menteri Agama Fachrul Razi. Dia sedang diperiksa oleh internal Kementerian Agama.',

"Informasi tersebut dibenarkan oleh Wakil Menteri Agama Zainut Tauhid Sa'adi saat dikonfirmasi detikcom lewat telepon, Sabtu (22/2/2020).",

'"Benar bahwa Pak Nur Kholis Setiawan terhitung sejak tanggal 19 Februari 2020 dibebastugaskan sementara dari jabatannya sebagai Sekjen Kemenag," kata Zainut.',

"Wamenag Zainut Tauhid Sa'adi (Ari Saputra/detikcom)Belum diketahui apa alasan pencopotan sementara Nur Kholis. Diduga pencopotan ini terkait dengan posisi Plt Dirjen Bimas Katolik yang sempat mencuat. Seperti diketahui, jabatan Plt Dirjen Bimas Katolik yang diisi pejabat muslim, yakni Nur Kholis, menuai polemik. Saat dipanggil Komisi VIII DPR, Nur Kholis Setiawan, yang juga menjabat Sekjen Kemenag, awalnya menjelaskan bahwa pengangkatan Plt itu sudah sesuai prosedur.",

'Namun belakangan, Nur Kholis mengaku khilaf dan meminta maaf atas polemik tersebut. Ia mengaku kurang cermat memahami aturan sehingga kurang tepat saat memberikan masukan kepada Menteri Agama dan Wakil Menteri Agama.',

'Nur Kholis menyebut kekurangcermatan ini menimbulkan khilaf sehingga kurang tepat saat memberikan masukan kepada Menag dan Wamenag. Dia mengaku masih terpaku pada pertimbangan administrasi keuangan tentang tidak dimungkinkannya rangkap jabatan antara Kuasa Pengguna Anggaran (KPA), Pejabat Pembuat Komitmen (PPK), dan Pejabat Penandatangan Surat Perintah Membayar (PPSPM).',

'"Saya mohon maaf atas semua kekhilafan tersebut," katanya dalam keterangan di situs resmi Kemenag, Selasa (12/2).'
]

describe('ARTICLE TEST', function(){
  this.timeout(15000)
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

  describe('remove duplicate', () =>{
    it('req.body is provided as array so it should be okay', done=>{
        chai
        .request(app)
        .post('/articles/redactedArticle')
        .send( sampleArticle )
        .then(res=>{
          expect(res).to.have.status(200)
        })
        .catch(err => done(err))
    })
  })

});
