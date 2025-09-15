const User=require('../models/Ureg')
const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const Project = require('../models/Project');
const jwt=require('jsonwebtoken')
// const reg=async (req,res)=>{
//     const {userName,email,password,userType,projectAsignedStat}=req.body
//     const hashpassword=await bcrypt.hash(password,10)
//     try{
//         const user=await User.create({userName,email,password:hashpassword,userType,projectAsignedStat})
//         res.status(400).json(user)
//     }
//     catch(error){
//         res.status(400).json({error:error.message})
//     }
// }
const reg = async (req, res) => {
  const { userName, email, password, userType, projectAsignedStat } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      userName,
      email,
      password: hashpassword,
      userType,
      projectAsignedStat,
    });

    // ✅ Successful registration
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    // ❌ Registration failed
    res.status(400).json({ error: error.message });
  }
};




const viewAllUsers=async (req,res)=>{
    try{
        const users=await User.find({}).sort({createdAt:-1})
        res.status(201).json(users)
}
catch(error){
    res.status(400).json({error:error.message})
}
}

// const Viewmembers=async (req,res)=>{
//     try{
//         const members=await User.find({userType:{$in:["leader","user"]}},{projectAsignedStat:'assigned'}).sort({createdAt:-1})
//         res.status(201).json(members)
//     }catch(error){
//         res.status(400).json({error:error.message})
//     }
// }

const Viewmembers = async (req, res) => {
    try {
        const leaders = await User.find(
            { userType: "leader", projectAsignedStat: "assigned" }
        );
        const users = await User.find(
            { userType: "user", projectAsignedStat: "not_assigned" }
        );
        const members = [...leaders, ...users]
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const Viewtaskmembers = async (req, res) => {
    try {
        const leaders = await User.find(
            { userType: "leader", projectAsignedStat: "assigned" }
        );
        const users = await User.find(
            { userType: "user" }
        );
        const members = [...leaders, ...users]
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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


const login=async (req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        res.status(400).json({error:'user not found'})
    }
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch){
        return res.status(400).json({error:'password is incorrect'})
    }
    try{
        const token=jwt.sign({id:user._id,userType:user.userType},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({token,id:user._id,userType:user.userType})

    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={reg,viewAllUsers,Viewmembers,viewUser,updateUser,login,Viewtaskmembers}