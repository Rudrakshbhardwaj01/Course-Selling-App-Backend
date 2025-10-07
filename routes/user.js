const { Router } = require("express");
const { userAuth } = require("../auth/userAuth");
const bcrypt = require('bcrypt');
const { userModel, courseModel } = require("../db");
const jwt=require('jsonwebtoken');
const JWT_SECRET_USER=process.env.JWT_SECRET_USER;
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPass = await bcrypt.hash(password, 5);

    await userModel.create({
        email:email,
        password: hashedPass,
        name:name
    })
    res.json({
        message: "You've signed up"
    })
})

 userRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user= await userModel.findOne({
        email
    })
    
    const passwordMatch= bcrypt.compare(password,user.password)

    if(user&&passwordMatch){
        const token= jwt.sign({
            _id:user._id.toString()
        },JWT_SECRET_USER)

        res.json({
            token,
            message:"You are signed in"
        })
    }
    else(
        res.json({
            message:"Invalid credentials"
        })
    )
})

userRouter.get("/purchases", userAuth, async function (req, res) {
    const _id=req.userId

    const purchases=courseModel.find({
        _id
    })

    let purchasedCourseIds=[];

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter
}