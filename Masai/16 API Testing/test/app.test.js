const chai = require('chai');

const { server } = require('../server.js');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
let score = 1;

describe('Testing APIs', function () {
    // Testing GET Route
    describe('GET /users', function () {
        it('should GET all the users', function (done) {
            chai.request(server)
                .get('/users')
                .end(function (err, response) {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    response.body.should.have.length.above(9);
                    score += 2;
                    done();
                });
        });
    });
});

console.log("Final Score : " + score);
