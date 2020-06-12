const { Schema, model}= require('mongoose')

const UserSchema = new Schema({
    email: String,
    name: String,
    password: String

}, {
    timeStamps: true
})

const User = model('User', UserSchema)
module.exports = { User }