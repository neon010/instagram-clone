const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/verifyToken");

//setting up user model
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async(req,res)=>{
    const {name,email,password} = req.body;

    //checking if user with the same password exist in db
    const emailExist = await User.findOne({email});
    if(emailExist){
        return res.status(422).json({error:"user already exists with that email"});
    };

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //saving the user information in db
    const user = new User({
        name,
        email,
        password:hashedPassword
    });
    try {
        await user.save();
        res.status(200).json({message:"user credential saved succesfully"});
    } catch (error) {
        res.status(400).json({error:error});
    }    
    console.log(req.body);
});

router.post("/signin", async (req,res)=>{
    const {email,password} = req.body

    //finding if user with the given email exist or not
    const user = await User.findOne({email});
    if(!user){
        return res.status(500).json({error:"email or password is incorrect"});
    };

    //checking the password is correct or not
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({error:"email or password is incorrect"});
    };
    try {
        //Assigning jwt token
        const {_id,name,email} = user
        const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
        res.status(200).json({token, user:{_id,name,email}}); 
    } catch (error) {
        console.log(error);
    }

})



module.exports = router;