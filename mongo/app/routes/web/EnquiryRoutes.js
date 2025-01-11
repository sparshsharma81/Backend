const express = require('express');
const enquiryRoutes = express.Router();
const { enquiryInsert, enquiryList, deleteEnquiry, EnquiryUpdate } = require('../../controllers/web/userEnquiryController');





enquiryRoutes.get("/enquiry.get",enquiryList)
enquiryRoutes.post("/enquiry.insert",enquiryInsert);
enquiryRoutes.delete("/enquiry.delete/:id",deleteEnquiry)

enquiryRoutes.put("/enquiry.update/:id",EnquiryUpdate)

module.exports =enquiryRoutes;