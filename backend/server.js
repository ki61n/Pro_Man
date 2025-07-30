const express= require('express')
const app=express()
const mongoose=require('mongoose')

const env=process.env
const PORT=env.port || 3000
const router=require("./routes/router")
app.use(express.json())

app.use('/',router)

//data base connection

mongoose.connect(`mongodb://localhost:27017/proman2`)
.then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log("cannot connect to database", err);
    
})

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`);
    
})