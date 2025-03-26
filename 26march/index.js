const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
// app.get('/readfile',(req,res)=>{
//     res.send("Hello world this is /readfile route");
// })
app.get('/readfile/:filename',(req,res)=>{ //now we can extract the filename
    res.send("Hello world this is /readfile route");
    console.log(req.params.filename);

    //slugs -- parameters 
    //if in the get --- /readfile/route --- if there are not column( : ) -- it is end point 
    //if slum are present --- it is slums --
})
app.listen(port,()=>{
    console.log(`server is running at port${port}`);
})