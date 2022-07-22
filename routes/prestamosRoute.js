// Routes of users

// Host + /api/prestamo

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  getPrestamos,
  newPrestamo,
  addQuota,
  payCapital,
  updatePrestamo,
  changeStatePrestamo,
} = require("../controllers/prestamosController");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateObjectId } = require("../middlewares/validate-objectId");
const { validatePin } = require("../middlewares/validate-pin");

router.use(validateJWT);

router.get("/", getPrestamos);
router.post(
  "/",
  [
    check("amount", "El valor a prestar es obligatorio").not().isEmpty(),
    check("document", "El documento es obligatorio").not().isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("quota", "La cantidad de cuotas son obligatorias").not().isEmpty(),
    check("percentage", "El porcentaje a prestar es obligatorio")
      .not()
      .isEmpty(),
    check("startDate", "La fecha de inicio es obligatoria").custom(isDate),
    validateFields,
  ],
  newPrestamo
);

router.post("/quota/:id", [validateObjectId, validatePin], addQuota);
router.post(
  "/pay/:id",
  [
    check("pay", "El abono a capital es obligatorio").isNumeric(),
    validateFields,
    validateObjectId,
    validatePin,
  ],
  payCapital
);

router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("document", "El documento es obligatorio").not().isEmpty(),
    check("startDate", "La fecha inicial es obligatoria").custom(isDate),
    validateFields,
    validateObjectId,
    validatePin,
  ],
  updatePrestamo
);

router.put("/state/:id", [validateObjectId, validatePin], changeStatePrestamo);

module.exports = router;
