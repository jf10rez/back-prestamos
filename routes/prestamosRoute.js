// Routes of users

// Host + /api/prestamo

const { Router } = require('express')
const router = Router()

const { getPrestamos, newPrestamo } = require('../controllers/prestamosController')

router.get( '/', getPrestamos )
router.post( '/', newPrestamo )

module.exports = router