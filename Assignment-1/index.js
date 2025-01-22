const express=require('express');

const app=express();


app.use((req,res,next)=>{
    console.log('Middleware 1');
    console.log('Request URL:',req.url);
    console.log('Request Method:',req.method);
    console.log('Request Time:',new Date());
    console.log('Request IP:',req.ip);
    next();
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/about',(req,res)=>{
    res.send('About Us');
});

// http://localhost:3000/profile/2000/99d
app.get('/profile/:commentId/:Id',(req,res)=>{
    console.log(req.params);
    const {commentId,Id}=req.params;
    // res.send('print the commentId and Id');
    res.send(`Comment ID: ${req.params.commentId} and ID: ${req.params.Id}`);
}   );


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}); 