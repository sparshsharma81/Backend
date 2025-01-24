const express= require('express');
const app = express();

// app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.send("Hello world");

});

app.get('/g25',(req,res)=>{
    res.send('hello world this is working');
});
app.listen(6000,()=>{
    console.log("The server is running perfectly..");
});
