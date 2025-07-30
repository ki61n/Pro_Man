const User=require('../models/Ureg')
const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const Project = require('../models/Project');
const reg=async (req,res)=>{
    const {userName,email,password,userType,projectAsignedStat}=req.body
    const hashpassword=await bcrypt.hash(password,10)
    try{
        const user=await User.create({userName,email,password:hashpassword,userType,projectAsignedStat})
        res.status(400).json(user)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
const viewAllUsers=async (req,res)=>{
    try{
        const users=await User.find({}).sort({createdAt:-1})
        res.status(201).json(users)
}
catch(error){
    res.status(400).json({error:error.message})
}
}
const viewUser=async (req,res)=>{
    let query=[]
    const {id}=req.params
   
        if(mongoose.Types.ObjectId.isValid(id)){
        //     return res.status(400).json({error:"Invalid user"})
        // }else{
            query.push({_id:id})
}
 try{
         query.push({userName:id})

    const user=await User.findOne({$or : query})

if(!user){
    return res.status(400).json({error:"User not found"})
}
    res.status(200).json(user)


}catch(error){
    res.status(400).json({error:error.message})
}}
const updateUser = async (req, res) => {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid user id" });
    }

    // Hash password if it's being updated
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updateuser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updateuser) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updateuser);
}

module.exports={reg,viewAllUsers,viewUser,updateUser}