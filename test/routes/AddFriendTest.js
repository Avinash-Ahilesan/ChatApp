const chai = require('chai')
const User = require('../../src/models')
const chaiHttp = require('chai-http')
const app = require('../../src/Server')

const expect = chai.expect

chai.use(chaiHttp)

let agent = "";
describe('Adding Friends Test', () => {
    before((done) => {
        User.deleteMany({}).then((err) => {
            // if (err) throw err;
            agent = chai.request.agent(app)
            agent
                .post('/register')
                .set('Content-Type', 'application/json')
                .send({email:"avinash112@gmail.com", fullname:"Avinash", username: "avi-131", password:"sSecretp123", passwordConfirmation: "sSecretp123"})
                .end ((err, res) => {
                    chai.request(app)
                        .post('/register')
                        .set('Content-Type', 'application/json')
                        .send({email:"avinash2@gmail.com", fullname:"Avind", username: "chiefsosa", password:"sSecretp123", passwordConfirmation: "sSecretp123"})
                        .end ((err, res) => {
                            expect(res.status).to.equal(200);
                            done();
                        })
                })
        })
    })

   it('Add a single user', (done) => {
        agent.post('/friendlist')
            .end((err, res) => {
                console.log(res.text)
                done();
            })
    })
})