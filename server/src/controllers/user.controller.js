const userModel = require('../models/user.model')
const Response = require('../utils/Response')
const authMiddlewares = require('../middlewares/auth.middlewares')
const bcrypt = require('bcrypt')
const APIError = require('../utils/Error')

const register = async (req,res) => {
    const user = req.body

    if(!user) return new Response(null, 'not found user').badRequest(res)
    
    const password = await bcrypt.hash(req.body.password,10)

    const foundUser = await userModel.findOne({email : user.email})
    if(foundUser) return new Response(null, 'user already registered').conflict(res)
    
    const newUser = new userModel({
        username: user.username,
        email : user.email, 
        password : password
    })
    const result = await newUser.save()
    if(result) return new Response(null, 'user registiration succesfully').created(res)

}


const login = async (req,res) => {
    const user = await userModel.findOne({email : req.body.email})
    if(!user) throw new APIError('User information is incorrect, please try again', 400)

    if( (user.email === req.body.email) && await bcrypt.compare(req.body.password, user.password)) {
        authMiddlewares.createToken(user,res)
    }
    else throw new APIError('User information is incorrect, please try again', 400)

}




module.exports = {
    login, register
}