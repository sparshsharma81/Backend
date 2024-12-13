const https = require("https");
//console.log(https);

const server = https.createServer((req,res)=>{
    res.write("Chitkara university");
    res.write("rajpura punjab");
    res.end("Rajpura end...");

});

server.listen(3000,(err)=>{
    console.log("Server is running at port 3000");
    console.log("hello world");
})