const express = require('express')
const{checkToken} = require("./checktokenmiddleware");
require("dotenv").config(); //this will initilize the env file..
//and now we can use the variables or keys inside the env file...
const app = express()
// const mytoken = "12345"
// const pass = "123";


// const checkToken= (req,res,next)=>{
//     console.log(req.query.token)
//     if(req.query.token =="" || req.query.token == undefined){
//         return res.send(
//             {
//                 status:0,
//                 msg: "Bhai token ki value to likh"
//             }
//         )
//     }
//     if (req.query.token != mytoken){
//         return res.send(
//             {
//                 status:0,
//                 msg: "bhai tune correct token ki value nahi likhi"
//             }
//         )

//     }
//     next();

// }
// app.use(checkToken);
app.use(express.json()) // this is necessary to tell the compiler that json type of data is being sended...

// app.use((req,res,next)=> {
//     if(req.query.pass == " " ||  req.query.pass == undefined){
//         return res.send(
//             {
//                 status:0,
//                 msg:"Bhai sahi value to daal"
//             }
//         )
//         }

//     if(req.query.pass!= pass){
//         return res.send(
//             {
//                 status:1,
//                 msg:"Bhai tune correct value nahi daali password ki...."
//             }
//         )
//     }

//     next();
    
//     }
// )
console.log(process.env.mytoken);

app.get('/',(req,res)=>{
    res.send({status:1,msg:"hello world"});
})
app.get('/about',checkToken,(req,res)=>{
    res.send({status:1,msg:"hello world this is dell"});
})
app.get("/news",(req,res)=>{
    res.send("News details")
})
app.get("/news/:id",(req,res)=>{
    let currentId = req.params.id;
    res.send("News details API" + currentId)
})
app.post('/login',(req,res)=>{
    console.log(req);
    res.send({status:1,msg:"Hello world",data:req.body})
})

app.listen(process.env.PORT || 8000);