const express = require('express');
const app = express();
// app.use(express.static('public')); /////using this , the home route will load the index.html file...and this can be improved further
//this help is running static files, that are in public folder///

//all the static files are supposed to be handled in /static routes
app.use('/static',express.static('public'));
//all the files in the public folder are always servered on localhost:3000/static/index.html ---then only html file in the public folder are served...



app.get('/',(req,res)=>{
    res.send("hello world");
});
app.listen(8000,(req,res)=>{
    console.log("the output is running");
})