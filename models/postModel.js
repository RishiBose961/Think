const { Schema, model, mongoose } = require('mongoose')


const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdby: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Post = model("Post", postSchema)

module.exports = Post
