// Routes of users

// Host + /api/prestamo

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { getPrestamos, newPrestamo } = require('../controllers/prestamosController')
const { isDate } = require('../helpers/isDate')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

router.use( validateJWT )

router.get( '/', getPrestamos )
router.post( '/', [
    check("amount", "El valor a prestar es obligatorio").not().isEmpty(),
    check("document", "El documento es obligatorio").not().isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("quota", "La cantidad de cuotas son obligatorias").not().isEmpty(),
    check("percentage", "El porcentaje a prestar es obligatorio").not().isEmpty(),
    check("state", "El estado es obligatorio").not().isEmpty(),
    check("startDate", "La fecha de inicio es obligatoria").custom( isDate ),
    validateFields

], newPrestamo )

module.exports = router