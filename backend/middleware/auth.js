const jwt=require('jsonwebtoken')

const varifyTocken=(req,res,next)=>{
    let token
    let authHeader=req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
    token=authHeader.split(' ')[1]
    if(!token){ return res.status(401).json({message:'No token provided'})
    }
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    console.log("docode user",res.user);
    next()
    
}
catch(error){
    return res.status(400).json({error:'Invalid token'})
}}
else{
    return res.status(401).json({error:'Unauthorised acess,  token not found'})
}

}




const authrole=(...allowedrole)=>{
    return (req,res,next)=>{
        if(!allowedrole.includes(req.user?.userType)){
            return res.status(403).json({error:'Forbidden acces, you dont have permission to access'})
}
next()
    }
}

module.exports={varifyTocken,authrole}