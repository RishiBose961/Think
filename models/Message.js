const { Schema, model, mongoose } = require('mongoose')


const MessageSchema = new Schema({
    coversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
}, { timestamps: true })

const Message = model("Message", MessageSchema)

module.exports = Message
