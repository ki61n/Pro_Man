const Asignmembers=require('../models/team')
const AsignTask=require('../models/asignTask')
const Project=require('../models/Project');
const { default: mongoose } = require('mongoose')



const asignMember=async (req,res)=>{
    const {project,asignMembers}=req.body
    try{
         const existingTeam = await Asignmembers.findOne({ project });

    if (existingTeam) {
      // If exists, return an error response
      return res.status(400).json({ message: 'Team for this project already exists. Please update the existing team.' });
    }
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
        res.status(400).json(teammembers)
    }
    catch(error){
        res.status(200).json(error,error.message)
    }
}



const getAsignMembersById=async (req,res)=>{
   const {id}=req.params
   const query=[]
   if(mongoose.Types.ObjectId.isValid){
    query.push({_id:id})
    query.push({project:id})
   }
   try{
    const teammembers=await Asignmembers.find({ $or: query }).populate('asignMembers')
    if(!teammembers){
        return res.status(404).json({error:"No team members found with the given ID"})
    }
    res.status(200).json(teammembers)
    }
    catch(error){
        res.status(400).json(error,error.message)
        }
        }

   
   
 const updateMembers = async (req, res) => {
    const { id } = req.params;
    const query = [];
    let updateteam = { ...req.body };

    if (mongoose.Types.ObjectId.isValid(id)) {
        query.push({ _id: id });
        query.push({ project: id });
    }

    try {
        const updatedteam = await Asignmembers.findOneAndUpdate({ $or: query }, updateteam, { new: true });
        if (!updatedteam) {
            return res.status(404).json({ message: 'No team found with the given id' });
        }
        res.status(200).json(updatedteam);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};





const taskassign= async (req,res)=>{
     const {project,projectcol,member,task,TaskDescription,dueDate,status}=req.body
        try{
            // Fetch the project to validate the due date
            const projectData = await Project.findById(project);
            if (!projectData) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Check if the due date is valid
            if (new Date(dueDate) > new Date(projectData.dueDate)) {
                return res.status(400).json({ message: 'Due date must be less than or equal to the project due date' });
            }

            // Check if a task for the same project and member already exists
            const existingTask = await AsignTask.findOne({ project, member });
            if (existingTask) {
                return res.status(400).json({ message: 'Task already exists for this project and member. Please update the task instead.' });
            }

            // Create the task
            const asignTask=await AsignTask.create({project,projectcol,member,task,TaskDescription,dueDate,status})
            res.status(201).json(asignTask)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }




    const getAllTaskAssign=async (req,res)=>{
        try{
            const taskassign=await AsignTask.find({}).sort({createdAt:-1})
            res.status(200).json(taskassign)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}



// const gettaskAssignedByid=async (req,res)=>{
//     const {id,mid}=req.params
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({ message: 'Invalid task id' })
//     }
//     try {
//         // const taskassigned=await AsignTask.findOne({project:id,member:mid})
//         const taskassigned=await AsignTask.findOne({id})

//         if (!taskassigned) {
//             return res.status(404).json({ message: 'No task found with the given id'});
//         }
//         res.status(200).json(taskassigned);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//     }
// }


const gettaskAssignedByid = async (req, res) => {
    const { id, mid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(mid)) {
        return res.status(404).json({ message: 'Invalid project or member ID' });
    }

    try {
        const taskassigned = await AsignTask.findOne({
            project: id,
            member: mid
        });

        if (!taskassigned) {
            return res.status(404).json({ message: 'No task found with the given project and member ID' });
        }

        res.status(200).json(taskassigned);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const gettaskAssignedBymemid = async (req, res) => {
    const { id } = req.params;
    const query=[]
    if(mongoose.Types.ObjectId.isValid(id))
       query.push({member:id})
        try {
            const taskassigned=await AsignTask.find({$or: query}).populate('projectcol')
            if (!taskassigned) {
            return res.status(404).json({ message: 'No task found with the given member ID'})
            }
           res.status(200).json(taskassigned);
            } catch (error) 
            {
               res.status(400).json({ error: error.message });
            }

}



// const updateTask=async (req,res)=>{
//     const {id}=req.params
//     let updatetask = { ...req.body }

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({ message: 'Invalid task id' })
//         }
//         try {
//             const task=await AsignTask.findByIdAndUpdate(id,updatetask,{new:true})
//             if (!task) {
//                 return res.status(404).json({ message: 'No task found with the given id'});
//                         }
//             res.status(200).json(task);
//         } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

// PUT /updateAssignedTask/:id/:mid
const updateTask = async (req, res) => {
  const { id, mid } = req.params;
  const { task, TaskDescription, dueDate } = req.body;

  try {
    const updated = await AsignTask.findOneAndUpdate(
      { project: id, member: mid },
      { task, TaskDescription, dueDate },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


    module.exports={asignMember,getAsignMembers,getAsignMembersById,updateMembers,taskassign,getAllTaskAssign,gettaskAssignedByid,gettaskAssignedBymemid,updateTask}


