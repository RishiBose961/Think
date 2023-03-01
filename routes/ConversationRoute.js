const {Router} = require('express')
const conversionController = require('../controller/Conversions')
const auth = require('../middleware/auth')
const route = Router()

route.post('/api/conversation',conversionController.createConversion)
route.get('/api/conversations/:userId',conversionController.conversionShow)
route.get('/api/find/:firstUserId/:secondUserId',conversionController.conversationTwoUserId)
module.exports = route;