const { response } = require('express')

const loginUser = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
    })

}

const loginWithFacebook = ( req, res = response ) => {

    console.log(req)

}

module.exports = {
    loginUser,
    loginWithFacebook
}