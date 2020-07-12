const chai = require('chai')
const User = require('../../src/models')
const chaiHttp = require('chai-http')
const app = require('../../src/Server')

const expect = chai.expect

chai.use(chaiHttp)

let agent = "";
let agent2 = ""
let user1 = "avi-131"
let user2 = "chiefsosa"
describe('Adding Friends Test', () => {
    before((done) => {
        User.deleteMany({}).then((err) => {
            // if (err) throw err;
            agent = chai.request.agent(app)
            agent2 = chai.request.agent(app)
            agent
                .post('/register')
                .set('Content-Type', 'application/json')
                .send({email:"avinash112@gmail.com", fullname:"Avinash", username: user1, password:"sSecretp123", passwordConfirmation: "sSecretp123"})
                .end ((err, res) => {
                    agent2
                        .post('/register')
                        .set('Content-Type', 'application/json')
                        .send({email:"avinash2@gmail.com", fullname:"Avind", username: user2, password:"sSecretp123", passwordConfirmation: "sSecretp123"})
                        .end ((err, res) => {
                            expect(res.status).to.equal(200);
                            done();
                        })
                })
        })
    })

   it('Add a single user - user exists and friend request sent', (done) => {
        agent.post('/friends/requests')
            .send({username: user2})
            .end((err, res) => {
                console.log(res.text)
                done();
            })
    })

    it('Fails - user doesnt exist', (done) => {
        agent.post('/friends/requests')
            .send({username: "Random User"})
            .end((err, res) => {
                console.log(res.text + " " + res.status)
                done();
            })
    })

    it('Accept', (done) => {
        agent2.post('/friends/replyToRequest')
            .send({reply: 'accept', username: user1})
            .end((err, res) => {
                console.log(res.text)
                done();
            })
    })


    it('Get online friends - Check if friend requests were successfully accepted', (done) => {
        agent2.get('/friends/online')
            .end((err, res) => {
                expect(JSON.parse(res.text).message).to.deep.equals([`${user1}`])
                done();
                agent.get('/friends/online')
                    .end((err, res) => {
                        expect(JSON.parse(res.text).message).to.deep.equals([`${user2}`])
                        done();
                    })
            })
    })

    /*it('Fails - current user not authenticated', (done) => {

    })*/
})