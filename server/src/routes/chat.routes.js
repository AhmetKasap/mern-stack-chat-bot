const express = require('express')
const router = express.Router()

const {createChat,getChat} = require('../controllers/chat.controller')
const authMiddlewares = require('../middlewares/auth.middlewares')

router.post('/', authMiddlewares.checkToken, createChat)
router.get('/', authMiddlewares.checkToken, getChat)



module.exports = router