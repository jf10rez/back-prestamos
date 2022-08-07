// Routes of users

// Host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { newUnits, getUnits } = require("../controllers/unitsController");
const router = Router();
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

router.use( validateJWT )

router.get( "/", getUnits )
router.post( "/", [ check("amount").not().isEmpty(), validateFields ], newUnits )

module.exports = router;
