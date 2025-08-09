const express=require('express')
const router=express.Router()
const {reg, viewAllUsers, viewUser, updateUser, login, Viewmembers} =require("../controles/userControles")
const { addProject, viewallproject, viewproject, Updateproject, viewProjecByNameOrId } = require('../controles/projectControles')
const { asignMember,taskassign, getAsignMembers, getAsignMembersById, updateMembers, getAllTaskAssign, gettaskAssignedByid, updateTask, gettaskAssignedBymemid } = require('../controles/tasks')
const { createLeaderRequest, memberrequest, viewLeaderRequest, viewreqByid, viewLeaderReqby, adminResponse, viewMemberReqby, viewMemberRequest, MemviewreqByid, leaderResponse, MemviewreqByidstat, MemviewreqByidaccepted, MemviewreqByidrejected, MemviewreqBy } = require('../controles/request')
const { varifyTocken, authrole } = require('../middleware/auth')
router.get('/',(req,res)=>{
    res.send("welcome")
})
//users
router.post("/register",reg)
router.get("/viewallusers",viewAllUsers)
router.get("/viewuser/:id",viewUser)
router.put("/updateuser/:id",updateUser)
router.get("/viewmembers",Viewmembers)

//project
router.post("/addproject",addProject)
router.get("/viewprojects",viewallproject)
router.get("/viewproject/:id",viewproject)
router.put("/updatepro/:id",Updateproject)
router.get("/pname/:id",viewProjecByNameOrId)

//add members to project
router.post("/addmembers",asignMember)
router.get("/viewpoMembers",getAsignMembers)
router.get("/viewMembersById/:id",getAsignMembersById)
router.put("/updateMembers/:id",updateMembers)

//task
router.post("/assignTask",taskassign)
router.get("/viewAssignedtasks",getAllTaskAssign)
router.get("/viewAssignedTaskById/:id/:mid",gettaskAssignedByid)
router.put("/updateAssignTask/:id/:mid",updateTask)   
router.get("/viewmembertask/:id",gettaskAssignedBymemid)
// lead  requests
router.post("/leaderRequest",createLeaderRequest)
router.get("/leaderRequeststatus",viewLeaderReqby)
router.get("/ViewleaderRequest",viewLeaderRequest)
router.get("/viewreqByid/:id", viewreqByid); 
router.put("/adminresponce/:id", adminResponse); 

//mem requests

router.post("/memberRequest",memberrequest)
router.get("/memberRequeststatus",viewMemberReqby)
router.get("/ViewmemberRequest",viewMemberRequest)
router.get("/viewmemreqByid/:id", MemviewreqByid); 
router.get("/viewmemreqByid/:id", MemviewreqByid); 
router.get("/viewmemreqByidstat/:id", MemviewreqByidstat);
router.get("/viewmemreqByidacc/:id", MemviewreqByidaccepted);
router.get("/viewmemreqByidrej/:id", MemviewreqByidrejected);
 router.get("/viewmemreqBy/:tid/:id", MemviewreqBy);


router.put("/leaderresponce/:id", leaderResponse); 

//logins
router.post("/login",login)

router.get('/login/admin',varifyTocken,authrole("admin"),(req,res)=>{
    res.send('Admin Dashboard')})
router.get('/login/leader',varifyTocken,authrole("leader"),(req,res)=>{
    res.send('leader Dashboard')})
router.get('/login/member',varifyTocken,authrole("user"),(req,res)=>{
    res.send('member Dashboard')})

module.exports=router