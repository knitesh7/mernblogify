const {connect} = require("mongoose")

const connect2db = async (uri)=>{
    return connect(uri)
}

module.exports = connect2db