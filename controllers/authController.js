const { response } = require('express')

const loginUser = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
    })

}

module.exports = {
    loginUser
}