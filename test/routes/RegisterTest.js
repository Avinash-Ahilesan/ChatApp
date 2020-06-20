const chai = require('chai')
const User = require('../../src/models')
const chaiHttp = require('chai-http')
const app = require('../../src/Server')

const expect = chai.expect

chai.use(chaiHttp)


describe('Registering Account Tests', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        })
    });

    it('Register valid account', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({email:"avinash112@gmail.com", name:"Avinash", password:"sSecretp123", passwordConfirmation: "sSecretp123"})
            .end ((err, res) => {
                expect(res.status).to.equal(200);
                done();
            })
    });

    it('Register reject bad email', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({email:"avinash112", name:"Avinash", password:"sSecretp123", passwordConfirmation: "sSecretp123"})
            .end ((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })

    it('Register reject password not valid - no capitals', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({email:"avinash112@gmail.com", name:"Avinash", password:"secretp123", passwordConfirmation: "secretp123"})
            .end ((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })

    it('Register reject - character less than 8 characters', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({email:"avinash112@gmail.com", name:"Avinash", password:"stp123", passwordConfirmation: "stp123"})
            .end ((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })

    it('Register reject - has no numbers', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({email:"avinash112@gmail.com", name:"Avinash", password:"sSecretp", passwordConfirmation: "sSecretp"})
            .end ((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })

    it('Register reject - confirmation doesnt match', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({email:"avinash112@gmail.com", name:"Avinash", password:"sSecretp123", passwordConfirmation: "sSecr"})
            .end ((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    })
})