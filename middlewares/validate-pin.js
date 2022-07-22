const User = require("../models/UserModel")
const bcrypt = require('bcryptjs');

const validatePin = async( req, res, next ) => {

    try {

        const { pin } = req.body

        if( !pin ){
            return res.status(400).json({
                ok: false,
                message: 'Por favor ingrese un pin'
            })
        }

        const user = await User.findById( req.uid )

        const validatePin = bcrypt.compareSync( pin, user.pin )

        if( !validatePin ){
            return res.status(400).json({
                ok: false,
                message: "El pin es inválido"
            })
        }
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            message: "Por favor valide el pin"
        })    
    }

}

module.exports = { validatePin }