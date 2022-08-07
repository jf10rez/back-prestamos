const { Schema, model } = require("mongoose");


const UnitSchema = Schema({
    amount: {
        type: Number,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

UnitSchema.method('toJSON', function(){//Para devolver la info en el controlador con el objeto modificado
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Unit', UnitSchema)