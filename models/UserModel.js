const { Schema, model } = require("mongoose");


const PrestamoSchema = Schema({
    amount: {
        type: Number,
        required: true
    },
    document: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    startDate: {
        type: String,
        required: true
    }
})

PrestamoSchema.method('toJSON', function(){//Para devolver la info en el controlador con el objeto modificado
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Prestamo', PrestamoSchema)