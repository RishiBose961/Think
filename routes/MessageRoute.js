const {Router} = require('express')
const messageController = require('../controller/Message')

const auth = require('../middleware/auth')
const route = Router()

route.post('/api/message',messageController.createMessage)
route.get('/api/messages/:coversationId',messageController.messageShow)
module.exports = route;