const dayjs = require("dayjs")

const isDate = ( value ) => {
    
    if( !value ) return false

    const date = dayjs(value).toDate()
    
    if( dayjs(date).isValid() ) return true
}

module.exports = { isDate }