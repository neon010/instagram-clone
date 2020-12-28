const express = require("express");
const mongoose = require("mongoose");
const verify = require("../middleware/verifyToken");

const router = express.Router();
const Post = require("../models/post");

router.post("/createpost", verify, async (req,res)=>{
    const {title, body, imageUrl} = req.body
    if(!title || !body || !imageUrl){
        return res.status(422).json({error:"add all the field"});
    };
    console.log(req.user._id);
    const post = new Post({
        title,
        body,
        imageUrl,
        postedBy:req.user._id
    })
    try {
        await post.save();
        res.status(200).json({message:"user posted successfully"});
    } catch (error) {
        res.status(400).json({error})
    }
})

router.get("/allpost", async (req,res)=>{
    try {
        const allPost = await Post.find().populate("postedBy", "_id name");
        res.status(200).json(allPost);
    } catch (error) {
        console.log(error);
    };
});

router.get("/mypost", verify, async (req,res)=>{
    try {
        const mypost = await Post.find({postedBy:req.user._id}).populate("postedBy", "_id name");
        res.status(200).json(mypost);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router
