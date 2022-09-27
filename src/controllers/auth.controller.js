// const User = require('../models/User.model')
const {StatusCodes} = require('http-status-codes')
const UserModel = require('../models/User.model')

const register = async (req, res) => {
    const user = await UserModel.create({...req.body})
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token: user.createJWT()})
}

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if (!user) return res.json({error: "User not found!"})
    const passwordValid = await user.checkPassword(password)
    if (passwordValid) res.status(StatusCodes.OK).json({user: {name: user.name}, token: user.createJWT()})
    else res.json({error: "Invalid username or password"})
}

module.exports = {
    register,
    login,
}