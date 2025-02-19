const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.send("Hello world this is working out...");
})
app.listen(8000,(req,res)=>{
    console.log("the server is running..");
})