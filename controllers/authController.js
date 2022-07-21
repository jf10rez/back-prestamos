const { response } = require('express')
const bcrypt = require('bcryptjs');

const User = require('../models/UserModel')

const loginUser = async( req, res = response ) => {

    const { email, password  } = req.body

    try {

        const user = await User.findOne({email})

        if( !user ){
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            })
        }

        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                message: 'La contraseña no es correcta'
            })
        }

        res.status(200).json({
            ok: true,
            uid: user.id,
            email: user.email,
            token: 'Nothing'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Se produjo un error en el servidor'
        })
    }
    

}

const createUser = async ( req, res = response ) => {

    try {

        const { email, password } = req.body

        const validateEmail = await User.findOne({ email })

        console.log(validateEmail)

        if( validateEmail ){
            return res.status(400).json({
                ok: false,
                message: "El usuario ya existe"
            })
        }

        const user = new User( req.body )
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt )

        const userSave = await user.save()
        
        res.status(201).json({
            ok: true,
            message: "El usuario se creó correctamente",
            user: {
                id: userSave.id,
                email: userSave.email,
                name: userSave.name
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Se produjo un error con el servidor"
        })
    }

}

const loginWithFacebook = ( req, res = response ) => {

    console.log(req)

}

module.exports = {
    loginUser,
    loginWithFacebook,
    createUser
}