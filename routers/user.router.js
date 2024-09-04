const router = require('express').Router()
const { auth } = require('../middlewares/auth.middleware')
const { login, register, getUser } = require('../controllers/user.controller')

router.post('/login', login)
router.post('/register', register)
router.get('/register', auth, getUser)


module.exports = router