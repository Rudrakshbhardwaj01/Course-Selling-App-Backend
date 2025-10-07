const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db");
const { adminAuth } = require('../auth/adminAuth');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

adminRouter.post("/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPass = await bcrypt.hash(password, 5);

    await adminModel.create({
        email,
        password: hashedPass,
        name
    })

    res.json({
        message: "You've signed up"
    })
})

adminRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({
        email
    })

    const passwordMatch = bcrypt.compare(password, admin.password);

    if (admin && passwordMatch) {
        const token = jwt.sign({
            _id: admin._id.toString()
        }, JWT_SECRET_ADMIN);

        res.json({
            token,
            message: "You're signed in"
        });
    }
    else {
        res.json({
            message: "Invalid Credentials"
        })
    }
})
adminRouter.get("/course/bulk", adminAuth, async function (req, res) {
    const adminId = req._id;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})
adminRouter.put("/course", adminAuth, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})
adminRouter.post("/course", adminAuth, async function (req, res) {
    const adminId = req._id;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})
module.exports = {
    adminRouter
}