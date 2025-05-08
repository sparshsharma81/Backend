const express = require('mongoose');
const mongoose = require('express');
const app = express();

console.log(mongoose.connect());

//promise is having 3 states 
/*
pending,rejection,fullfilled 

--in order to connect with mongodb --- it takes time ---- so we use promise 
--like with in 0 seconds we can connecet with mongodb 

--javascript first do early determine checking
 process has a stack memory where code is exectured 
 code is execteud global index 

 suppose mongodb takes 200ms to connect.... so it does not wait for 200ms
 code will be run by LIBUB


 javascript code is exectued inside process
  the memory in processor is very resourseful ... it does not wait ..
  so the proecess, timer webapi..all those are run by api 
  libub ---asynchronous task 

  they are two ways to consume a response
  .then .catch() 

  async and await 

  we can make a function that can we asynchrounous and await function


*/


const dbConnection = async()=>{
  try{
    await mongoose.connect(
      
    );
    console.log("Connected to MongoDb Atlas");
    app.listen(3000,()=>{
      console.log("App is running");
    })
  }
    
}

//and we need to call that also 
dbConnection();