const {Router}=require("express");
const courseRouter=Router();

courseRouter.get("/preview", async function (req,res){
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

courseRouter.post("/purchase", async function (req,res){
    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})

module.exports={
    courseRouter
}