const mongoose = require ('mongoose')

let newSchema = new mongoose.Schema ({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    // userId:{type:String, required:true}
})


let messageSchema = ({
    userName: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true}
    
})

let userModel = mongoose.model("kubool", newSchema)
let messageModel = mongoose.model("kuboolMessage", messageSchema)



module.exports = {userModel, messageModel}