const express = require("express");
const mongoose = require("mongoose");

const app = express();

//for env file
require('dotenv').config();
const port = process.env.PORT || 5000;

//connecting to db
const uri = process.env.Mongo_URI;
mongoose.connect(uri, {useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true}, (error)=>{
    if(error){
        console.log(`connection unsuccesful error: ${error}`);
    }else{
        console.log(`connection established successfully ${mongoose.connection.host}`);
    };
});
//parsing json middleware
app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));



if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
});
