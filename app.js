const express = require ('express')
const app = express()
const bodyparser = require ('body-parser')
const dotenv = require ('dotenv')
const cors = require ('cors')



dotenv.config()


app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(bodyparser.urlencoded({extended:true, limit: "50mb"}))


require('./connection/mongoose.connection')

let userRouter = require('./routes/user.route')
app.use('/user', userRouter)

require('./models/user.model');


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