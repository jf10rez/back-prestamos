const mongoose = require('mongoose')

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONN)

        console.log('Database is online')
        
    } catch (error) {
        console.log(error)
        throw new Error( 'Error al conectar con la base de datos' )
    }

}

module.exports = { dbConnection }