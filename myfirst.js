//node js-- allows the user to run the javascript code outside the browser---
//there is one single language --- javascript that can be used for both front-end and  back-end.//

//now we requite the importing of https module
var http = require('http'); //this module is require to import a mode in node-js..


http.createServer(function (req, res) { //this is an callback server---that calls automatically when someone calls them..
    //the req-- this represent the request comming from the client...
    // res -- this represents the response going to the client
  res.writeHead(200, {'Content-Type': 'text/html'});//this will send the code to the header--
  /*
the 200 indicates--- ok
404 -- indicates error-
500 ---indicates server error
  */
  res.end('Hello World!');
}).listen(8001);