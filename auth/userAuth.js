const jwt=require("jsonwebtoken");
JWT_SECRET_USER=process.env.JWT_SECRET_USER
function userAuth(req,res,next){
    const token=req.headers.token;
    const registered=jwt.verify(token,JWT_SECRET_USER);

    if(registered){
        req.userId=registered._id;
        next();
    }
    else{
        res.json({
            message:"You're not signed in"
        })
    }
}

module.exports={
    userAuth
}