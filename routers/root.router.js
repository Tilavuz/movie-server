const router = require('express').Router()


// User router
const userRouter = require('./user.router')
router.use('/', userRouter)

// movie router
const movieRouter = require('./movie.router')
router.use('/', movieRouter)



module.exports = router