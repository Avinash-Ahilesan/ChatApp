const { Schema, model}= require('mongoose')
const { hash, compare } = require('bcrypt')
const crypto = require('crypto')

const BCRYPT_WORK_FACTOR = require('../../config/Auth').BCRYPT_WORK_FACTOR

const UserSchema = new Schema({
    email: String,
    username: String,
    fullname: String,
    password: String,
    friends: Array,
    friendRequests: Array

}, {
    timestamps: true
})

UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        const shaPassword= crypto.createHash('sha256').update(this.password).digest('base64')
        this.password = await hash(shaPassword, BCRYPT_WORK_FACTOR)
    }
})

UserSchema.methods.matchesPassword = function(password) {
    const shaPassword = crypto.createHash('sha256').update(password).digest('base64')
    return compare(shaPassword, this.password);
}
const User = model('User', UserSchema)
module.exports = { User }