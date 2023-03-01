const { Schema, model, mongoose } = require('mongoose')


const ConversionSchema = new Schema({
    members:{
        type:Array
    }
}, { timestamps: true })

const Conversion = model("Conversion", ConversionSchema)

module.exports = Conversion
