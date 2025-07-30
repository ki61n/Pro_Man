const mongoose=require('mongoose')
const schema=mongoose.Schema
const User=require('./Ureg')

const assignMemberSchema=new schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        require:true
    },
    asignMembers:[{
        type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true
        
    }]

},{timestamps:true})
assignMemberSchema.pre('save', async function(next) {
    const doc1 = this;
    if (doc1.isNew) {
        try {
            await User.updateMany(
                { _id: { $in: doc1.asignMembers } },
                { $set: { projectAsignedStat: 'assigned' } }
            );
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});
module.exports=mongoose.model('Asignmembers',assignMemberSchema)