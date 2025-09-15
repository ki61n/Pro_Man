const User = require('../models/Ureg');
const LeaderRequest = require('../models/leaderReq');
const memRequest=require('../models/MemberRequests');
const AsignTask=require('../models/asignTask')
const { default: mongoose } = require('mongoose');
const createLeaderRequest = async (req, res) => {
    try {
        // Find an admin user
        const adminUser = await User.findOne({ userType: 'admin' });
        if (!adminUser) {
            return res.status(404).json({ error: 'Admin user not found' });
        }

        // Create leader request with admin's ID
        const leaderReq = await LeaderRequest.create({
            teamleader: req.body.teamleader,
            lname:req.body.teamleader,
            adminn: adminUser._id,
            project:req.body.project,
            request: req.body.request,
            status: req.body.status,
            response: req.body.response
        });

        res.status(201).json(leaderReq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const viewLeaderRequest=async (req,res)=>{
    try {
        const leaderreq=await LeaderRequest.find().sort({createdAt:-1}).populate('lname').populate('project')
        res.status(200).json(leaderreq)
        } catch (error) {
            res.status(400).json({ error: error.message });
            }
}


const viewLeaderReqby=async (req,res)=>{
    try {
        const leaderreq=await LeaderRequest.find({status:'pending'}).sort({createdAt:-1})
        res.status(200).json(leaderreq)
        } catch (error) {
            res.status(400).json({ error: error.message });
            }
}


// const viewreqByid= async(req,res)=>{
//     const {id} = req.params
//     let query =[]
//     if(mongoose.Types.ObjectId.isValid(id)){
   
//     query.push({_id:id})
//     query.push({teamleader:id})
//     try {
//         const leaderreq=await LeaderRequest.find({ $or: query})
//          if(!leaderreq){
//         return res.status(404).json({error:"No team members found with the given ID"})
//     }
//         res.status(200).json(leaderreq)
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//     }
// }
// }

const viewreqByid = async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
    }

    // Build query
    const query = [
        { _id: id },
        { teamleader: id }
    ];

    try {
        // Fetch leader requests matching the query
        const leaderreq = await LeaderRequest.find({ $or: query }).populate('project').populate('lname');
        if (leaderreq.length === 0) {
            return res.status(404).json({ error: "No leader requests found with the given ID" });
        }
        res.status(200).json(leaderreq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const adminResponse=async (req,res)=>{
    const {id}=req.params
    let updateres = { ...req.body }
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: 'Invalid member id' })
    }
     try {
         const adminres = await LeaderRequest.findByIdAndUpdate(id, updateres, { new: true });
            if (!adminres) {
                return res.status(404).json({ message: 'No team found with the given id' });
            }
            res.status(200).json(adminres);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }}





const memberrequest = async (req, res) => {
  const { requestedmember,username, teamleader, task, request, status = 'pending', response = '' } = req.body;

  // Basic validation
  if (!requestedmember || !teamleader || !task || !request) {
    return res.status(400).json({ error: 'All required fields must be provided.' });
  }

  try {
    const memberreq = await memRequest.create({
      requestedmember,
      username,
      teamleader,
      task,
      request,
      status,
      response
    });

    res.status(201).json(memberreq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const viewMemberRequest=async (req,res)=>{
    try {
        const memreq=await memRequest.find().sort({createdAt:-1})
        res.status(200).json(memreq)
        } catch (error) {
            res.status(400).json({ error: error.message });
            }
}


const viewMemberReqby=async (req,res)=>{
    try {
        const memreq=await memRequest.find({status:'pending'}).sort({createdAt:-1})
        res.status(200).json(memreq)
        } catch (error) {
            res.status(400).json({ error: error.message });
            }
}



const MemviewreqByid = async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
    }

    // Build query
    const query = [
        { _id: id },
        { requestedmember: id },
        {teamleader:id}
    ];

    try {
        const memreq = await memRequest.find({ $or: query }).populate('username').populate('task');
        if (memreq.length === 0) {
            return res.status(404).json({ error: "No  requests found with the given ID" });
        }
        res.status(200).json(memreq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const MemviewreqBy = async (req, res) => {
  const { id, tid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  try {
    const memreq = await memRequest.find({
      $and: [
        {
          $or: [
            { _id: id },
            { requestedmember: id },
            { teamleader: id }
          ]
        },
        { task: tid } // ensure this matches your schema field
      ]
    }).populate('username').populate('task');

    if (memreq.length === 0) {
      return res.status(404).json({ error: "No requests found with the given ID and TID" });
    }

    res.status(200).json(memreq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const MemviewreqByidstat = async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
    }

    // Build query
    const query = [
        { _id: id },
        { requestedmember: id },
        {teamleader:id}
    ];

    try {
        const memreq = await memRequest.find({ $or: query ,status:'pending'}).populate('username').populate('task');
        if (memreq.length === 0) {
            return res.status(404).json({ error: "No  requests found with the given ID" });
        }
        res.status(200).json(memreq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const MemviewreqByidrejected = async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
    }

    // Build query
    const query = [
        { _id: id },
        { requestedmember: id },
        {teamleader:id}
    ];

    try {
        const memreq = await memRequest.find({ $or: query ,status:'rejected'}).populate('username').populate('task');
        if (memreq.length === 0) {
            return res.status(404).json({ error: "No  requests found with the given ID" });
        }
        res.status(200).json(memreq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const MemviewreqByidaccepted = async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid id" });
    }

    // Build query
    const query = [
        { _id: id },
        { requestedmember: id },
        {teamleader:id}
    ];

    try {
        const memreq = await memRequest.find({
            $and: [
                { $or: query },
                { status: { $in: ['accepted', 'approved'] } }
            ]
        }).populate('task');
        if (memreq.length === 0) {
            return res.status(404).json({ error: "No  requests found with the given ID" });
        }
        res.status(200).json(memreq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const leaderResponse=async (req,res)=>{
    const {id}=req.params
    let updateres = { ...req.body }
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: 'Invalid member id' })
    }
     try {
         const memreq = await memRequest.findByIdAndUpdate(id, updateres, { new: true });
            if (!memreq) {
                return res.status(404).json({ message: 'No team found with the given id' });
            }
            res.status(200).json(memreq);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }}


module.exports = { createLeaderRequest,memberrequest,viewLeaderRequest ,viewreqByid,viewLeaderReqby,adminResponse
    ,leaderResponse,MemviewreqByid,viewMemberRequest,viewMemberReqby,MemviewreqByidstat,MemviewreqByidaccepted,MemviewreqByidrejected ,MemviewreqBy};
