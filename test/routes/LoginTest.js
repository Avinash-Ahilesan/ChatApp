const chai = require('chai')
const User = require('../../src/models')
const chaiHttp = require('chai-http')
const app = require('../../src/Server')

const expect = chai.expect

chai.use(chaiHttp)


describe('Logging In Tests', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        })
    });

    it('Attempt to log in to a fresh account ', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({
                email: "avinash112@gmail.com",
                fullname: "Avinash",
                username: "avi131",
                password: "sSecretp123",
                passwordConfirmation: "sSecretp123"
            })
            .then((res1) => {
                expect(res1.status).to.equal(200)
                chai.request(app).post('/login')
                    .send({email: "avinash112@gmail.com", password: "sSecretp123"})
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(JSON.parse(res.text).message).to.equal("Logged In")
                        done();
                    })
            })
    })

    it('Login to account that doesnt exist', (done) => {
        chai.request(app).post('/login')
            .send({email: "avinash112@gmail.com", password: "sSecretp12"})
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(JSON.parse(res.text).message).to.equal("Unauthorized")
                done();
            })
    })

    it('Login fails - wrong password', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({
                email: "avinash112@gmail.com",
                fullname: "Avinash",
                username: "avi131",
                password: "sSecretp123",
                passwordConfirmation: "sSecretp123"
            })
            .then((res1) => {
                expect(res1.status).to.equal(200)
                chai.request(app).post('/login')
                    .send({email: "avinash112@gmail.com", password: "sSecretpassword123"})
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        expect(JSON.parse(res.text).message).to.equal("Unauthorized")
                        done();
                    })
            })
    })

    it('Login fails - wrong email', (done) => {
        chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send({
                email: "avinash1@gmail.com",
                fullname: "Avinash",
                username: "avi131",
                password: "sSecretp123",
                passwordConfirmation: "sSecretp123"
            })
            .then((res1) => {
                expect(res1.status).to.equal(200)
                chai.request(app).post('/login')
                    .send({email: "avinash@gmail.com", password: "sSecretp123"})
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        expect(JSON.parse(res.text).message).to.equal("Unauthorized")
                        done();
                    })
            })
    })

    it('Login fails - email failed to validate as an email', (done) => {
        chai.request(app).post('/login')
            .send({email: "avinashgmail.com", password: "sSecretp123"})
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(JSON.parse(res.text).message).to.equal("Bad Request")
                done();
            })
    })
})