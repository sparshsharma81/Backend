// const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// app.use(express.json());

app.post("/",(req,res)=>{
    console.log(req.body);
    res.send("Hello world");
});

app.listen(3000,()=>{
    console.log("Server is running on 3000");
});

//create read update delete -- crud operations ..
//browser by default get ki request hi chalat hai..
//it can not run update delete read ---