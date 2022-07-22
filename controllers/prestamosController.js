const { response } = require('express')
const Prestamo = require('../models/PrestamoModel')

const getPrestamos = async( req, res = response ) => {

    try {
        
        const prestamos = await Prestamo.find( { user: req.uid } )

        res.status(200).json({
            ok: true,
            prestamos
        })

    } catch (error) {
        console.log(error)
    }

}

const newPrestamo = async( req, res = response ) => {

    try {
        
        const prestamo = new Prestamo( req.body )
        prestamo.user = req.uid
        prestamo.currentQuota = 1
        const savePrestamo = await prestamo.save()

        res.status(201).json({
            ok: true,
            prestamo: savePrestamo
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error en el servidor'
        })
    }

}

module.exports = {
    getPrestamos,
    newPrestamo
}