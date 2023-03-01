const Message = require("../models/Message")



const messageController = {
    //new message
    createMessage: async (req, res) => {
        const newMessage = new Message(req.body)
        try {
            const savedMessage = await newMessage.save()
            res.status(200).json(savedMessage)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    //get conversation user
    messageShow: async (req, res) => {
        try {
            const messages = await Message.find({
                coversationId: req.params.coversationId
            })
            res.status(200).json(messages)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = messageController