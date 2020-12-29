const express = require("express");
const mongoose = require("mongoose");
const verify = require("../middleware/verifyToken");

const router = express.Router();
const Post = require("../models/post");

router.post('/createpost', verify, (req,res)=>{
    const {title,body,pic} = req.body 
    if(!title || !body || !pic){
      return  res.status(422).json({error:"Plase add all the fields"})
    }

    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
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
