const mongoose=require('mongoose')
const schema=mongoose.Schema
const User=require('./Ureg')
const projectSchena=new schema({
    projectName:{type:String,
        required:true
    },
    projectDescription:{type:String,
        required:true},
    dueDate:{type:Date,
            required:true
        },
    leaderAssigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    maxMembers:{
        type:Number,
        required:true
    },
    projectStatus:{type:String,
        enum:['Not Started','In Progress','Completed'],
        default:'Not Started'
    }
    

    },{timestamps:true}
)
projectSchena.pre('save', async function(next){
    const doc=this
    if(doc.isNew){
        try{
            if(doc.leaderAssigned){
                await User.findByIdAndUpdate(doc.leaderAssigned,
                    {$set:{userType:'leader',projectAsignedStat:'assigned'}}
                )
            }
            next()
        }
        catch(error){
            next(error)
        }
    }else{
        next()
    }
})

module.exports=mongoose.model('Project',projectSchena)