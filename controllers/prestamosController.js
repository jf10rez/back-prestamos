const { response } = require('express')
const Prestamo = require('../models/PrestamoModel')

const getPrestamos = ( req, res = response ) => {

    try {
        
        

    } catch (error) {
        console.log(error)
    }

    res.status(200).json({
        ok: true,
    })

}

const newPrestamo = async( req, res = response ) => {

    try {
        
        const prestamo = new Prestamo( req.body )
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