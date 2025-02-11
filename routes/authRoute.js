// Routes of users

// Host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
// const passport = require("passport");
const router = Router();
const { validateFields } = require("../middlewares/validate-fields");

// router.use(passport.initialize());

const {
  loginUser,
  loginWithFacebook,
  createUser,
  revalidateToken,
  getPin,
} = require("../controllers/authController");
const { validateJWT } = require("../middlewares/validate-jwt");
require("../middlewares/facebook");

router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.post(
  "/new",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("pin", "El pin es obligatorio").not().isEmpty(),
  ],
  createUser
);

// router.get("/facebook", passport.authenticate("facebook"));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/fail",
//   }),
//   loginWithFacebook
// );

router.post(
  "/pin",
  [check("pin", "El pin es obligatorio").not().isEmpty(), validateJWT, validateFields],
  getPin
);

router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
