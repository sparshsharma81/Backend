let express = require('express');
require('dotenv').config();
var mongoose = require('mongoose');
const enquiryModel = require('./model/enquiry.model');
let app = express();
app.use(express.json());

//this is the insertion data technique
app.post("/api/enquiry.insert",(req,res)=>{
    let{name,email,phone,message}=req.body;
    // console.log(name,email,phone,message);
    let enquiry = new enquiryModel({
        name:name,
        email:email,
        phone:phone,
        message:message
    });
    enquiry.save().then(()=>{
        console.log({status:1,msg:"data is saved..."});
    }).catch(()=>{
        console.log({status:0,msg:`there is an error${err}`});
    })

    res.send("Data Saved");
});



app.get("/api/enquiry.get",async (req,res)=>{
    // res.send({status:1,message:"Enquiry list",data:[]})
    //the upper line which is commented..we can also do like...
    //we need not to write res.send.... 

    let enquiryList = await enquiryModel.find(); //answer array me hi return karega
    res.status('200').json({status:1,message:"Enquiry-list", data:[enquiryList]})
})
//now we are connecting to mongodb


app.delete("/api/enquiry.delete/:id",async (req,res)=>{
    let enquiryId = req.params.id;
    let deleteEnquiry = await enquiryModel.deleteOne({_id:enquiryId})
    res.send({status:1, msg:"deleted data",id:enquiryId, delRes:deleteEnquiry});
})

app.put("/api/enquiry.update/:id",async (req,res)=>{
    let enquiryId = req.params.id;
    let {name,email,phone,message} = req.body;
    let updateObj ={
        name:name,
        email:email,
        phone:phone,
        message:message
    };
    let updateRes = await enquiryModel.updateOne({_id:enquiryId},updateObj)
    res.send({status:1,msg:"The data is updated",id:updateRes});
    
})

mongoose.connect(process.env.DBURL).then(()=>{ //now this is a kind of promise...
    // we are using a callback function then in this...
    //we are creating a database named userenquiry 
    console.log("Successfully connected to MongoDB");
    app.listen(process.env.PORT || "8001",()=>{
        console.log(`The port is running... on ${process.env.PORT}`)
    })

    //process.env.DBURL -- this will find the .env file and inside that there is a variable 
    ///called as DBURL

})