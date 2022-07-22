const { response } = require("express");
const jwt = require("jsonwebtoken");


const validateJWT = ( req, res = response, next )=> {

    //x-token headers
    const token= req.header('x-token')

    if( !token ){
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        })
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_KEY_JWT
        )

        const { uid, name } = payload

        req.uid = uid
        req.name = name

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            message: 'Se produjo un error'
        })
    }
}

module.exports = {
    validateJWT
}