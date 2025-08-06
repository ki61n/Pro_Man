const mongoose=require('mongoose')
const schema=mongoose.Schema
const memRequests=new schema({
    requestedmember:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Asignmembers', // Reference to Asignmembers collection
        require:true
    },
    username:{
         type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'AsignTask', // Reference to Tasks collection
    },
    teamleader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
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

module.exports=mongoose.model('memRequest',memRequests)