const express = require ('express')
const app = express()
const bodyparser = require ('body-parser')
const dotenv = require ('dotenv')
const cors = require ('cors')
const mongoose = require ('mongoose')
let userRouter = require('./routes/user.route')



dotenv.config()


app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(bodyparser.urlencoded({extended:true, limit: "50mb"}))



app.use('/user', userRouter)


let URI = process.env.MONGO


 mongoose.connect(URI)
 .then(()=>{
    console.log('Mongoose has connected successfully');
 })
 .catch((err)=>{
    console.log(err);
 })


 app.get('/', (req,res)=>{
   console.log('hello world');
   res.send('hello world')
 })

 app.post('/test', (req,res)=>{
   console.log('post test');
   res.send('test')
 })
 


app.listen('4000', ()=>{
    console.log('it is connected');
})