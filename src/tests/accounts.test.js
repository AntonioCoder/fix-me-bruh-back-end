const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);

let token = '';

describe ('Accounts', () => {
  before((done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'kek@gmail.com',
        password: '123qwe',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName']);
        res.body.should.have.property('token');
        // eslint-disable-next-line prefer-destructuring
        token = res.body.token;
        done();
      });
  });
  it('Should sign up user and return success', (done) => {
    chai.request(app)
      .post('/accounts/sign-up')
      .send({
        firstName: 'Anton',
        lastName: 'Pokemon',
        email: 'trudovanton1@gmail.com',
        password: '123qwe',
        phoneNumber: '+380637242275',
        longitude: 29.911230,
        latitude: 50.074718,
        category: 'mister',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        done();
      });
  });
  it('Should login user and return his auth data', (done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'trudovanton1@gmail.com',
        password: '123qwe',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName']);
        res.body.should.have.property('token');
        done();
      });
  });
});