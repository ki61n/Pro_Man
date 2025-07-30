const express=require('express')
const router=express.Router()
const {reg, viewAllUsers, viewUser, updateUser} =require("../controles/userControles")
const { addProject, viewallproject, viewproject, Updateproject, viewProjecByNameOrId } = require('../controles/projectControles')
const { asignMember,taskassign } = require('../controles/tasks')
const { createLeaderRequest, memberrequest } = require('../controles/request')
router.get('/',(req,res)=>{
    res.send("welcome")
})
//users
router.post("/register",reg)
router.get("/viewallusers",viewAllUsers)
router.get("/viewuser/:id",viewUser)
router.put("/updateuser/:id",updateUser)




//project

router.post("/addproject",addProject)
router.get("/viewprojects",viewallproject)
router.get("/viewproject/:id",viewproject)
router.put("/updatepro/:id",Updateproject)
router.get("/pname/:id",viewProjecByNameOrId)

//task

router.post("/addmembers",asignMember)
router.post("/assigntask",taskassign)



// requests
router.post("/leaderRequest",createLeaderRequest)
router.post("/memberRequest",memberrequest)


module.exports=router