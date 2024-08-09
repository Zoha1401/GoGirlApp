const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/GoGirlFinal").then(()=>
{
    console.log("connection successfull")
}).catch((error)=>
{
 console.log(error)
 console.log("no connection")   
})