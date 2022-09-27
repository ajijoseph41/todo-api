const express = require('express')
const todoRouter = require('./routes/todos.router')
const authRouter = require('./routes/auth.router')

//security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const app = express()
module.exports = app

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
)

//Middlewares
//No static files here, just added for project structure
const authenticate = require('./middlewares/auth')
app.use(express.static('./public'))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

//Routes
app.get('/heartbeat', (req, res)=>res.send('Server alive!'))
app.use('/api/v1/todos', authenticate, todoRouter)
app.use('/api/v1/auth', authRouter)


