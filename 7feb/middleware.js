const express = require('express');
const app = express();

app.use((req,res,next)=>{
    console.log("Time",Date.now());
    next();
})
//the next function execute the next code

app.get('/',(req,res)=>{
    res.send("Hello world");
});
app.listen('8000',(req,res)=>{
    console.log("the server is running....");
})
