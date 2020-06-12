const Router = require('express')
const registerSchema = require('../validation/Auth').registerSchema
const { login } = require('../Auth')
const guest  = require('../middleware')
const errors = require('../middleware')
const User = require("../models")
const router = Router();


router.post('/register', guest, errors.catchAsync(async (req, res) => {
    await registerSchema.validate(registerSchema, req.body)

    const { email, name, password } = req.body

    const found = await User.exists({ email })

    if (found) {
        console.log('invalid email')
        throw "Invalid Email"
    }

    const user = await User.create({
        email, name, password
    })

    login(req, user.id)

    res.json({ message: 'OK' })
}))

module.exports = router