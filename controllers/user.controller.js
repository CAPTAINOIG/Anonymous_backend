let {userModel, messageModel} = require('../models/user.model')






const registerUser = (req, res) => {
    let form = new userModel(req.body)
    form.save()
    .then((result)=>{
        console.log(result);
        res.send({status: true, message: 'user signed up successfully', result})
    })
    .catch((err)=>{
        console.log(err.code);
        if(err.code ==11000){
            res.send( {status: false, message: "Duplicate user found"})
        } else{
            res.send( {status: false, message: "please fill in appropriately"})
        
        }
        
    })
}

const userLogin = (req, res) =>{
    let userName = req.body.userName
    userModel.findOne({userName: userName})
    .then((result)=>{
        console.log(result);
        if(result==null){
            res.send({status:false, message: 'Incorrect email or username'})
        }else {
        res.send({status: true, result, message: 'User Signed in successfully'})
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

const sendMessage = (req,res) => {     
    let formy = new messageModel(req.body)
    formy.save()
    .then((result)=>{
        console.log(result)
        res.send({status: true, message: "Message sent successfully", result})
    })
    .catch((err)=>{
        console.log(err)
        res.send({status: false, message: 'Message not sent'})
    })
}

const viewMessage = (req,res)=>{
    let userName = req.body.userName
    messageModel.find({userName: userName})
    .then((result)=>{
        console.log(result);
        res.send({status: true, message: 'welcome', result})
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports = {registerUser, userLogin, sendMessage, viewMessage}