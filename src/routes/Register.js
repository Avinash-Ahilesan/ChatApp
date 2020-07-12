const Router = require('express')
const registerSchema = require('../validation/Auth').registerSchema
const validate = require('../validation').joiutil.validate
const { login } = require('../Auth')
const User = require("../models")
const {guest, catchAsync} = require("../middleware");
const router = Router();


router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(registerSchema, req.body)

    const { email, username, fullname, password } = req.body

    const foundEmail = await User.exists({ email })

    if (foundEmail) {
        console.log('invalid email')
        throw {status: 400, message: "Invalid Email"}
    }

    const foundUsername = await User.exists({ username })

    if (foundUsername) {
        console.log('username taken');
        throw {status: 400, message: "Username taken"}
    }

    const friends = []
    const friendRequests = []
    const user = await User.create({
        email, username, fullname, password, friends, friendRequests
    })

    login(req, user.id)

    res.json({ message: 'OK' })
}))

module.exports = router