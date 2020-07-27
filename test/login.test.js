"use strict";

const app = require("../index");
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('login', function () {
        it('should login the user and return their info', function () {
            chai.request(app)
                .get('/auth/login')
                .set('origin', 'https://localhost:3001/')
                .send({ username: 'pryon', passsword: 'pryon123' })
                .end(function (err, res) {
                    expect(err).to.equal(null);
                    expect(res).to.be.a('object');
                    expect(res.status).to.equal(200);
                });
        });
});