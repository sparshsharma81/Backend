require("dotenv").config(); //this will initilize the env file
const checkToken= (req,res,next)=>{
    // console.log(req.query.token)
    //since we are using the env file..so we need not to write this...
    console.log(process.env.mytoken)
    if(req.query.token =="" || req.query.token == undefined){
        return res.send(
            {
                status:0,
                msg: "Bhai token ki value to likh"
            }
        )
    }
    if (req.query.token != process.env.mytoken){
        return res.send(
            {
                status:0,
                msg: "bhai tune correct token ki value nahi likhi"
            }
        )

    }
    next();

}

module.exports = { checkToken };