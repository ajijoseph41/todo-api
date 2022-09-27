const express = require('express')

const AuthRouter = express.Router()
const {register, login} = require('../controllers/auth.controller')

AuthRouter.route('/login').post(login)
AuthRouter.route('/register').post(register)

module.exports = AuthRouter;