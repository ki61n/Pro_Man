const User = require('../models/Ureg');
const LeaderRequest = require('../models/leaderReq');
const memRequest=require('../models/MemberRequests')
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
            adminn: adminUser._id,
            request: req.body.request,
            status: req.body.status,
            response: req.body.response
        });

        res.status(201).json(leaderReq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const memberrequest=async (req,res)=>{
    const {requestedmember,teamleader,request,status,response}=req.body
    try{
        const memberreq=await memRequest.create({requestedmember,teamleader,request,status,response})
            res.status(201).json(memberreq)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
module.exports = { createLeaderRequest,memberrequest };