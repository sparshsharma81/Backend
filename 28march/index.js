const fs = require("fs");
const path =require("path");
const express =require("express");
const app = express();
const port = 3000;

app.get("/readfile/:filename",(req,res,next)=>{
    const path = pathoffile = path.join(__dirname,req.params.filename + ".txt");
    console.log(pathoffile);
    fs.readFile(pathoffile);
    fs.readFile(pathoffile,"utf-8",(err,data)=>{
        if(err){
            return next(new Error("file not found"));

        }
        else{
            res.status(200).send({success:true,message:data});
        }
    });
});

app.use("*",(req,res,next)=>{
    return next(new Error("Endpoint exist nahi karta"));
});
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(404).send({success:false,message:err.message});
});
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(404).send({sucess:false,message:err.message});
});
app.listen(port,()=>{
    console.log("Server is running..");
})