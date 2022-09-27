//contains mongoose middlewares and instance methods 
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
})

//replace the password with its hash before saving to DB
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Instance method to create JWT token
UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {
            userId: this._id,
            name: this.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )
}

//Instance method to check password is valid
UserSchema.methods.checkPassword = async function(inputPassword){
    const isValid = await bcrypt.compare(inputPassword, this.password)
    return isValid
}


module.exports = mongoose.model('User', UserSchema)
