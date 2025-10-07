const jwt=require("jsonwebtoken");
const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN

function adminAuth(req,res,next){
    const token=req.headers.token;
    const registered=jwt.verify(token,JWT_SECRET_ADMIN);
    if(registered){
        req.userId=registered._id;
        next()
    }
    else{
        res.json({
            message:"You're not signed in"
        })
    }
}

module.exports={
    adminAuth
}