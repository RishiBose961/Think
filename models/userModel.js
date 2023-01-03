const {Schema, model,mongoose} = require('mongoose')


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar:{
        type: String,
    },
    companyname:{
        type: String,
    },
    password: {
        type: String,
        required: true
    },
},{timestamps: true})

const User = model("User",userSchema)

module.exports = User
