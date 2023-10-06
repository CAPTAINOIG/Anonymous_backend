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
    .then((response)=>{
        console.log(response);
        if(response==null){
            res.send({status:false, message: 'Incorrect email or username'})
        }else {
        res.send({status: true, response, message: 'User Signed in successfully'})
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

const sendMessage = (req,res) => {     
    let info = req.body
    form = messageModel(info)
    form.save()
    .then((response)=>{
        console.log(response)
        res.send({status: true, message: "Message sent successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({status: false, message: 'Message not sent'})
    })
}

const viewMessage = (req,res)=>{
    console.log(req.body);
    let userName = req.body.userName
    // let email = req.body.email
    messageModel.find({userName: userName})
    .then((result)=>{
        console.log(result);
        res.send({status: true, message: 'welcome', result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

const deleteOne = (req,res) =>{
    console.log(req.body);
    messageModel.deleteOne({time: req.body.time, date: req.body.date, message: req.body.message})
    .then((result)=>{
        console.log(result);
        console.log(req.body);
        if(result){
            messageModel.find()
        .then((result)=>{
        console.log(result); 
        res.send({status:true,message:'updated after deletion',result})})
        
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}
module.exports = {registerUser, userLogin, sendMessage, viewMessage, deleteOne}