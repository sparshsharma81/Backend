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

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}); 