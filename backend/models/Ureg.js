const mongoose  = require("mongoose");
const schema=mongoose.Schema
const registerSchema=new schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{type:String,
        require:true
    },
    userType:{
        type:String,
        require:true,
        enum:["admin","user","leader"],
        default:"user"

    },
    projectAsignedStat:{
        type:String,
        enum:["assigned","not_assigned"],
        default:"not_assigned"
    }
},{timestamps:true})
module.exports=mongoose.model('User',registerSchema)