// Routes of users

// Host + /api/auth

const { Router } = require('express')
const passport = require('passport')
const router = Router()

router.use(passport.initialize())

const { loginUser, loginWithFacebook } = require('../controllers/authController')
require('../middlewares/facebook')

router.post( '/', loginUser )
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  }),
  loginWithFacebook
);

module.exports = router