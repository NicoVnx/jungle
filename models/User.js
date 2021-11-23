const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({

    name:{
        type: String,
        require: true,
        unique: false,
        null: false,
        lowercase: false,
        
    },
    password:{
        type: String,
        require: true,
        unique: false,
        null: false,
        lowercase: false,

    },
    email:{
        type: String,
        require: true,
        unique: true,
        null: false,
        lowercase: true,

    }, 
    userAdm:{
        type: Number,
        require: true,
        unique: false,
        null: false,
        lowercase: false,

    },         
    createdAt:{ 
        type: Date,  
        default: Date.now 
    }
})

 mongoose.model('users', UserSchema)

const User = mongoose.model('users', UserSchema)

module.exports = User



