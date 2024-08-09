require("./db")
const express = require('express')
const app = express()
const helmet= require("helmet")
const morgan=require("morgan")
const dotenv=require("dotenv")
const bodyParser=require("body-parser")

dotenv.config()

const port = process.env.port || 5000
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

dotenv.config()

app.use(bodyParser.json())


//Middleware to connect to endpoint
app.use(bodyParser.json({limit: "100mb", parameterLimit: 100000000}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000000}));

app.use(helmet())
app.use(morgan("common"))
 
//Giving routes
app.use('/api/auth', require('./routes/auth'))
 app.use('/api/community', require('./routes/community'))
 app.use('/api/mentor', require('./routes/mentor'))
app.use('/api/messages', require('./routes/messages'))
 app.use('/api/conversations', require('./routes/conversations'))
 app.use('/api/mentee', require('./routes/mentee'))
 app.use('/api/users', require('./routes/users'))
 app.use('/api/posts', require('./routes/posts'))
 app.use('/api/aiguidance', require('./routes/Chatbot'))
 app.use('/api/profanitycheck', require('./routes/profanity'))
 


app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.listen(port, () => {
    console.log(`GoGirl backend listening on port ${port}`)
  })