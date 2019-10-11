const router = require('express').Router()
const userRouter = require('./user')
const boostRouter = require('./boostcolor')

router.use('/user', userRouter)
router.use('/boost', boostRouter)

module.exports = router