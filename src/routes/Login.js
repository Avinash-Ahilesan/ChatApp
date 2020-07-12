const Router = require('express')
const validate = require('../validation').joiutil.validate
const User = require('../models')
const loginSchema = require('../validation/Auth').loginSchema
const {guest, auth, catchAsync} = require('../middleware');
const login = require('../Auth').login
const logout = require('../Auth').logout

const router = Router()


router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body)

    const {email, password} = req.body

    const user = await User.findOne({ email })

    // TODO: fix timing attack vulnerability (hash random string if user doesnt exist)
    if (!user || !(await user.matchesPassword(password))) {
        throw {status: 401, message: "Unauthorized"}
    }

    login(req, user.id, user.friends)

    res.json({status: 200, message: 'Logged In'})

}))

router.post('/logout', auth, catchAsync(async (req, res) => {
    await logout(req, res)
    res.json({status: 200, message: 'logged out'})
}))


module.exports = router