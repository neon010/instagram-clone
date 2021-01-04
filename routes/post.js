const express = require("express");
const mongoose = require("mongoose");
const verify = require("../middleware/verifyToken");

const router = express.Router();
const Post = require("../models/post");

router.post('/createpost', verify, async (req,res)=>{
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
      return  res.status(422).json({error:"Plase add all the fields"});
    }

    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    });

    try {
        const result = await post.save();
        res.status(200).json({post:result});
    } catch (error) {
        console.log(error);
    };

})

router.get("/allpost", verify, async (req,res)=>{
    try {
        const allPost = await Post.find().populate("postedBy", "_id name email pic").sort("-createdAt");
        res.status(200).json(allPost);
    } catch (error) {
        console.log(error);
    };
});

router.get('/getsubpost',verify, async (req,res)=>{
    try {
        const myFollowingPost = await Post.find().populate("postedBy", "_id name email pic");
        res.status(200).json(myFollowingPost);
    } catch (error) {
        console.log(error);
    }
})

router.get("/mypost", verify, async (req,res)=>{
    try {
        const mypost = await Post.find({postedBy:req.user._id}).populate("postedBy", "_id name");
        res.status(200).json(mypost);
    } catch (error) {
        console.log(error);
    }
})

router.put("/like", verify,  (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    },{
        new: true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json(result)
        }
    })
})

router.put("/unlike", verify, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    },{
        new: true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json(result)
        }
    })
});

router.put('/comment',verify,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',verify,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


module.exports = router;
