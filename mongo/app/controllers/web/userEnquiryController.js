const enquiryModel = require("../../model/enquiry.model");

let enquiryInsert = async (req,res)=>{
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
}

let enquiryList = async (req,res)=>{
    let enquiryList = await enquiryModel.find(); //answer array me hi return karega
    res.status('200').json({status:1,message:"Enquiry-list", data:[enquiryList]})

}

let deleteEnquiry = async(req,res)=>{
    let enquiryId = req.params.id;
    let deleteEnquiry = await enquiryModel.deleteOne({_id:enquiryId})
    res.send({status:1, msg:"deleted data",id:enquiryId, delRes:deleteEnquiry});
}

let EnquiryUpdate = async(req,res)=>{
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
    
}

module.exports={enquiryInsert,enquiryList,deleteEnquiry,EnquiryUpdate};