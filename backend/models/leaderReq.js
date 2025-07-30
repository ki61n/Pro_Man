const mongoose=require('mongoose')
const schema=mongoose.Schema
const ledRequest=new schema({
    teamleader:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',  
        require:true
    },
    adminn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    request:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    response:{
        type:String,
        default:'no responce yet'
    }
})

module.exports=mongoose.model('leaderRequest',ledRequest)