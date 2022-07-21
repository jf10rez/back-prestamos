const { response } = require('express')

const getPrestamos = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
    })

}

const newPrestamo = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
    })

}

module.exports = {
    getPrestamos,
    newPrestamo
}