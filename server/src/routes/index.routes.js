const express = require('express')
const router = express.Router()

const userRouter = require('./user.routes')
const chatRouter = require('./chat.routes')

router.use('/users', userRouter)
router.use('/chats', chatRouter)

 
module.exports=router