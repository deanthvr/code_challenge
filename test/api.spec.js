const app = require('../src/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

//test sample api endpoint
describe('GET /api endpoint', () => {
  it('GET /api endpoint succfully returns response', (done) => {
    chai.request(app)
      .get('/api')
      .end( function(err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('You have hit GET /api endpoint');
        done();
      })
     
  });
})

describe('POST /api/parse with no top_n', () => {
  it('POST /api/parse responds with error message', (done) => {
    chai.request(app)
      .post('/api/parse')
      .type('form')
      .attach('file', fs.readFileSync(path.join(__dirname, 'parse_file.txt')),'parse_file.txt')
      .end( function(err, res) {
        expect(res).to.have.status(400);
        expect(res.text).to.equal('"top_n" is required');
        done()
      })
    })
  })

  describe('POST /api/parse with invalid top_n', () => {
    it('POST /api/parse responds with error message', (done) => {
      chai.request(app)
        .post('/api/parse')
        .type('form')
        .field('top_n', '')
        .attach('file', fs.readFileSync(path.join(__dirname, 'parse_file.txt')),'parse_file.txt')
        .end( function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.equal('"top_n" must be a number');
          done()
        })
      })
    })

    describe('POST /api/parse with no file', () => {
      it('POST /api/parse responds with error message', (done) => {
        chai.request(app)
          .post('/api/parse')
          .type('form')
          .field('top_n', '5')
          .end( function(err, res) {
            expect(res).to.have.status(400);
            expect(JSON.parse(res.text).message).to.equal('A file is required!');
            done()
          })
        })
      })

      describe('POST /api/parse with non text file', () => {
        it('POST /api/parse responds with error message', (done) => {
          chai.request(app)
            .post('/api/parse')
            .type('form')
            .field('top_n', '')
            .attach('file', fs.readFileSync(path.join(__dirname, 'non_text_file.docx')),'non_text_file.docx')
            .end( function(err, res) {
              expect(res).to.have.status(400);
              expect(JSON.parse(res.text).message).to.equal('Could not upload the file: File must be a text file!');
              done()
            })
          })
        })

        describe('POST /api/parse successful response', () => {
          it('POST /api/parse responds result', (done) => {
            chai.request(app)
              .post('/api/parse')
              .type('form')
              .field('top_n', '5')
              .attach('file', fs.readFileSync(path.join(__dirname, 'parse_file.txt')),'parse_file.txt')
              .end( function(err, res) {
                let response = JSON.parse(res.text);
                expect(res).to.have.status(200);
                expect(response).to.haveOwnProperty('frequencies');
                expect(response.frequencies).to.be.an('Array');
                expect(response.frequencies.length).to.equal(5);
                done()
              })
            })
          })