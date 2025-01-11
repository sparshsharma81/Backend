const e = require('express');
let mongoose = require('mongoose');
let userenquirySchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
         type:String,
         required: true,
         unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    },  
    //now we have created a schema , -- meaning we create a table where all these fields are present..
    //now we are making enquiry model

    
    

});

let enquiryModel = mongoose.model("enquiry",userenquirySchema) //enquiry is the name of our database...
//the enquiry is basically our collection..
//and the userenquirySchema defines the field
module.exports= enquiryModel;
