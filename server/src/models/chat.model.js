const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    userMessage : {type : String, required : true},
    botMessage : {type : String, required : true},
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now } // Tarih ve saat ekleniyor


})


const chats = mongoose.model('chats', chatSchema)
module.exports = chats