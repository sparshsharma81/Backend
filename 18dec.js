console.log("Hello world");
const http = require("http");
const server = http.createServer((req,res)=>{
    console.log("Hello");
    res.end("chitkara university...");
});
server.listen(2300);