const Router = require('express')
const registerSchema = require('../validation/Auth').registerSchema
const validate = require('../validation')
const { login } = require('../Auth')
const User = require("../models")
const {guest, catchAsync} = require("../middleware");
const router = Router();


router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(registerSchema, req.body)

    const { email, name, password } = req.body

    const found = await User.exists({ email })

    if (found) {
        console.log('invalid email')
        throw {code: 400, message: "Invalid Email"}
    }

    const user = await User.create({
        email, name, password
    })

    login(req, user.id)

    res.json({ message: 'OK' })
}))

module.exports = router