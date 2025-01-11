let express = require('express');
require('dotenv').config();
var mongoose = require('mongoose');
const enquiryModel = require('./app/model/enquiry.model');
// const {enquiryInsert,enquiryList,deleteEnquiry, EnquiryUpdate} = require('./app/controllers/web/userEnquiryController')
const enquiryRoutes = require('./app/routes/web/EnquiryRoutes');
let app = express();
app.use(express.json());

//this is the insertion data technique
// app.post("/api/enquiry.insert",enquiryInsert);



// app.get("/api/enquiry.get",enquiryList)
    // res.send({status:1,message:"Enquiry list",data:[]})
    //the upper line which is commented..we can also do like...
    //we need not to write res.send.... 

    // let enquiryList = await enquiryModel.find(); //answer array me hi return karega
    // res.status('200').json({status:1,message:"Enquiry-list", data:[enquiryList]})

//now we are connecting to mongodb


// app.delete("/api/enquiry.delete/:id",deleteEnquiry)

// app.put("/api/enquiry.update/:id",EnquiryUpdate)


app.use("/web/api/enquiry",enquiryRoutes)//ye naam api ke aage judega////

//now in the localhost we need to write -- http://localhost:8000/web/api/enquiry/enquiry.insert and such things...

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