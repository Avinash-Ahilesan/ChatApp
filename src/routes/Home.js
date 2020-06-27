const Router = require('express')
const {auth, catchAsync} = require('../middleware')
const User = require('../models')

const router = Router()

router.get('/home', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId)
    if (!user) {
        res.status(401).json({message: 'Unauthorized'})
    }
    res.status(200).json({message: `Welcome ${user.username}!`})
}))

module.exports = router