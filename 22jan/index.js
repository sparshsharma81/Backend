const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    console.log("Hello world this is working in the sense of the world ");
    const{name,age}= req.query;
    res.send(`the route is running and age = ${age} , name = ${name} ${typeof(age)}`);

    //this req.query is query parameter
    //written like --- http://localhost:6999?college=chitkara;;
    //basically this college is req.query and chitkara is the value inside it

});
app.get('*',(req,res)=>{
    res.send("404 bole to dhyaan se likh bhai");
}); //if there any kind of error then this route will be shown
app.all('*',(req,res)=>{
    res.send("404 bole to dhyaan se likh bhai");
});//if there is any error then it will run in all the requests
app.listen(process.env.PORT || 6999 ,()=>{
    console.log("The server is running properly");
}); //russian
