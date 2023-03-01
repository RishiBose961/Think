const Conversion = require("../models/Conversion");

const conversionController = {
    //new conversiotn
    createConversion: async (req, res) => {
        const newConversion = new Conversion({
            members: [req.body.senderId, req.body.receiverId]
        })
        try {
            const savedConversation = await newConversion.save()
            res.status(200).json(savedConversation)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    //get conversation user
    conversionShow: async (req, res) => {
        try {
            const conversation = await Conversion.find({
                members: { $in: [req.params.userId] }
            })
            res.status(200).json(conversation)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    //get conversation includes two userId
    conversationTwoUserId: async (req, res) => {
        try {
            const conversationchat = await Conversion.findOne({
                members: { $all:[req.params.firstUserId,req.params.secondUserId]}
            })
            res.status(200).json(conversationchat) 
        } catch (error) {
            res.status(500).json({ message: error.message }) 
        }
    }

}

module.exports = conversionController