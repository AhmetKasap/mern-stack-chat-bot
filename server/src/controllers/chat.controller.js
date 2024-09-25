const userModel = require('../models/user.model')
const chatModel = require('../models/chat.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')

const createChat = async(req,res) => {
    const user = req.authUser
    const userMessage = req.body.userMessage

    const findUser = await userModel.findOne({email : user.email})
    if(!findUser) throw new APIError('user not found in db', 404)
    
    //chat bot 
    const botMessage = "test"

    const newChatModel = new chatModel({
        userMessage : userMessage,
        botMessage : botMessage,
        userRef : findUser._id
    })
    const response = await newChatModel.save()
    if(!response) throw new APIError('db error', 500)
    return new Response(botMessage, 'successful request').ok(res)


}

const getChat = async(req,res) => {
    const user = req.authUser

    const findUser = await userModel.findOne({email : user.email})
    if(!findUser) throw new APIError('user not found in db', 404)

    const chats = await chatModel.find({userRef : user._id})
    if(!chats) return new Response(null, 'not found message').ok(res)
    else return new Response(chats, 'found message').ok(res)

    
}

module.exports = {
    createChat,
    getChat
}