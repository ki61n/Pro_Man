const { default: mongoose } = require('mongoose')
const Project=require('../models/Project')
//user
const addProject= async (req,res)=>{
    const {projectName,projectDescription,dueDate,leaderAssigned,maxMembers,projectStatus}=req.body

    try{
        const project=await Project.create({ projectName,projectDescription,dueDate,leaderAssigned,maxMembers,projectStatus})
        res.status(201).json(project)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const viewallproject=async (req,res)=>{
    try{
        const projects=await Project.find({}).sort({createdAt:-1})
        res.status(201).json(projects)
    }
    catch(error){
        res.status(400).json({errer:error.message})
    }
}

const viewproject=async (req,res)=>{

    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid project id"})
    }
    const project= await Project.findById(id)
    if(!project){
        return res.status(404).json({error:"Project not found"})
    }
    res.status(200).json(project)
}

const viewProjecByNameOrId = async (req, res) => {
    const { id } = req.params;
    let query = [];

    // If id is a valid ObjectId, add _id and leaderAssigned search
    if (mongoose.Types.ObjectId.isValid(id)) {
        query.push({ _id: id });
        query.push({ leaderAssigned: id });
    }
    // Always add projectName regex search
    query.push({ projectName: { $regex: new RegExp(id, 'i') } });

    try {
        const project = await Project.find({ $or: query });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const Updateproject=async (req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid project id"})
    }
    const updateproject= await Project.findByIdAndUpdate(id,req.body,{new:true})
    if(!updateproject){
        return res.status(404).json({error:"project not found"})
}
res.status(200).json(updateproject)

}

module.exports={addProject,viewallproject,viewproject,Updateproject,viewProjecByNameOrId}