// Routes of users

// Host + /api/auth

const { Router } = require('express')
const router = Router()

const { loginUser } = require('../controllers/authController')

router.post( '/', loginUser )

module.exports = router