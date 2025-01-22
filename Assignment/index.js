const express= require('express');
const app = express();
require("dotenv").config();

app.get('/',(req,res)=>{
    console.log("This is working...");
    res.send("This is working");
})

app.listen(process.env.PORT || 6999); //russian