const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.send('Hello world');

})
app.get('/first',(req,res)=>{
    res.render('first',{
        title:"This is the first thing...",
        message:"this is the first message"
    });
});
app.get('/second',(req,res)=>{
    res.render('second',{
        title:"This is the second thing",
        message:"This is the second message"

    });
})
app.listen(8000,(req,res)=>{
    console.log("The server is working perfectly....");
})


//this is ejs file systum