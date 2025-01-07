let http = require('http');
let server = http.createServer((req,res)=>{
    res.end("Welcome to ws");

})
server.listen('4000');