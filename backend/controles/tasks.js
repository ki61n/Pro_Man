const Asignmembers=require('../models/team')
const AsignTask=require('../models/asignTask')
const { default: mongoose } = require('mongoose')



const asignMember=async (req,res)=>{
    const {project,asignMembers}=req.body
    try{
        const teamMember=await Asignmembers.create({project,asignMembers})
        res.status(201).json(teamMember)

    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}



const getAsignMembers=async (req,res)=>{
    try{
        const teammembers=await Asignmembers.find({}).sort({createdAt:-1}) 
    }
    catch(error){
        res.status(400).json(error,error.message)
    }
}



const getAsignMembersById=async (req,res)=>{
   const {id}=req.params
   try{
    const teammembers=await Asignmembers.findById(id)
    res.status(200).json(teammembers)
    }
    catch(error){
        res.status(400).json(error,error.message)
        }
        }

   
   
        
const updateMembers = async (req,res)=>
{
    const {id}=req.params
    let updateteam = { ...req.body }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: 'Invalid member id' })
    }
     try {
    const updatedteam = await Asignmembers.findByIdAndUpdate(id, updateteam, { new: true });
    if (!updatedteam) {
        return res.status(404).json({ message: 'No team found with the given id' });
    }
    res.status(200).json(updatedteam);
} catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
}}





const taskassign= async (req,res)=>{
     const {member,task,TaskDescription,dueDate,status}=req.body
        try{
            const asignTask=await AsignTask.create({member,task,TaskDescription,dueDate,status})
            res.status(400).json(asignTask)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
    module.exports={asignMember,updateMembers,getAsignMembersById,getAsignMembers,taskassign}


