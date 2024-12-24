const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const server = http.createServer((req,res)=>{
    let {method } = req; //OBJECT DESTRUCTURING K THROUGH METHOD KO REQUEST KAR RAHA HU--- FILE HANDLING..
    
        //we have request and response 2 data...
        //fs module se kisi file ke content ko read karte hai.../

    if( method == "GET"){
        if(req.url = "/"){
            console.log("inside / route and Get request");
            fs.readFile("User.json","utf8",(err,data)=>{ ///read karte samay error aa gye to..
                //fs.readFile a method to read file--- we are reading the file User.json file and in utf8 string
                //and in reading if there is error then it is stored in err and if no error then else case run..
                //the 200 status code is sended to the server...
                if(err){
                    console.log(err);
                    res.writeHead(500);//internal server problem ///writeHead ---we send the 
                    //code to the client...it is a standard so it is used...

                    res.end("Server Error");

                }
                else{
                    console.log(data);
                    res.writeHead(200,{"Content-Type :": "application/json"});
                    //we will see ui if the data is of type html--- browser will display it...
                    res.end(data); //respond.end --- 

                }
            });
        } else{
            console.log(req.url);
            res.writeHead(404);
            res.end("Not Found");

        }
    }else if(req.url == "/allstudent"){ //mtlb if the user hits the allstudent..then the user 
        //get the data of all student...
        fs.readFile("allstudent.html","utf8",(err,data)=>{ //utf8 is used to convert the binary data to string format


        })
    }
    //in first evaluation-- only git and push are implemented....

})
//get route and post route..
/*
getrequrest =---- to retrieve data from the server

post request--- this is used to send the data to the server;

CRUD APPLICATION--- POST REQUEST IS CREATED IN THAT....

USER.JSON FILE--- JISKE ANDAR DATA STORE HOGA...
ISKE ALAVA  ALLSTUDENT.HTMLL AND REGISTER.HTML HAI HTML ME
