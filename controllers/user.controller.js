let {userModel, messageModel} = require('../models/user.model')













    


















const registerUser = (req, res) => {
    let form = new userModel(req.body);
    form.save()
      .then((result) => {
        console.log(result);
        res.status(200).json({ status: true, message: "User signed up successfully", result });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 11000) {
          res.status(409).json({ status: false, message: "Duplicate user found" });
        } else {
          res.status(400).json({ status: false, message: "Fill in appropriately" });
        }
      });
  };


  
//     console.log(req.body);
//     const { password, email } = req.body;
// const userLogin = async (req, res) => {
//     let userName = req.body.userName
//     userModel.findOne({userName: userName})
//     .then((response)=>{
//         console.log(response);
//         if(response==null){
//             // res.send({status:false, message: 'Incorrect email or username'})
//             res.send({status:false, message: 'Incorrect username'})
// // 
//         }else {
//         res.send({status: true, response, message: 'User Signed in successfully'})
//         }
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }


const userLogin = async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password; // Assuming password is sent in the request body

    userModel.findOne({ userName: userName })
        .then((user) => {
            if (!user) {
                res.send({ status: false, message: 'Incorrect username' });
            } else {
                // Assuming user object has a 'password' field, change it as per your actual schema
                if (user.password === password) {
                    res.send({ status: true, message: 'User signed in successfully', user });
                } else {
                    res.send({ status: false, message: 'Incorrect password' });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: false, message: 'Server error' });
        });
};





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