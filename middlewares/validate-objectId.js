const { response } = require('express');
const {ObjectId} = require('mongodb');

const validateObjectId = ( req, res = response, next ) => {

    const param = Object.keys(req.params)

    //Desestructuración dinámica
    const { [param]: id } = req.params
    
    if( !ObjectId.isValid(id) )
    return res.status(400).json({
        ok: false,
        errors: 'El id ingresado no es valido'
    })

    next()
}

module.exports = { validateObjectId }