const router = require('express').Router()
const { login, getUser, register } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')

router.get('/auth', auth, getUser)
router.post('/login', login)
router.post('/register', register)


module.exports = router