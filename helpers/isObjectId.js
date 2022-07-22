const {ObjectId} = require('mongodb');

const isObjectId = ( value ) => {


    if( !value ) return false

    if( !ObjectId.isValid(value) ) return false

    return true

}

module.exports = { isObjectId }