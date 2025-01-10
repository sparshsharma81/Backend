let express = require('express')
const {dbConnection} = require("./dbConnection");
const { ObjectId } = require('mongodb');
let app = express();
const url = "mongodb://localhost:27017"
app.use(express.json()) //meaning in app jo hai vo json ke data ko handle karne wala hai

app.get("/student.read", async (req,res)=>{
    let myDb = await dbConnection();
    let studentCollection = myDb.collection("students")
    let data = await studentCollection.find().toArray();
    let resObj = {
        status:1, //this is necessary to tell the front-end that everything is good
        msg:"data is showing...",
        data
    }
    res.send(resObj)
})

app.post("/student.insert",async (req,res)=>{
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");
    let obj = {
        name:req.body.name,
        gmail:req.body.gmail,
    }
    console.log(obj);
    let insertResponse = await studentCollection.insertOne(obj)

    let resObj = {
        status:1,
        msg : "Data Insert",
        insertResponse
    }
    // res.send("Student insert api")
    res.send(resObj)
})

app.delete("/student.delete/:id", async (req,res)=>{ //and in this if we write student.delete/:id? that this means
    //that now params are not necessary to write..without it also it will work....
    let {id} = req.params;//{ye basically paramdata ke andar param ke id ka naam daal dega }
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let deletes = await studentCollection.deleteOne({_id:new ObjectId(id)})
    //this ObjectId is a build in method/class
    let resObj = {
        status:1,
        msg:"Ho gya delete",
        deletes
    }


    res.send(resObj)

})

app.put("/student.update/:id", async (req,res)=>{
    let {id} = req.params; 
    let{name, gmail} = req.body;
    // let obj = {name, gmail} //data ...
    //the main problem with this is that we have to enter all the values...
    //so new way is that 
    let obj = {} //we assign an empty array to obj
    if(name!="" && name!= null && name!=undefined){
        obj['name'] = name;
    }
    if(gmail!="" && gmail!=null && gmail!=undefined){
        obj['gmail'] = gmail;
    }

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");
    let updateRes = await studentCollection.updateOne({_id: new ObjectId(id)},{$set:obj})
    let resObj = {
        status:1,
        msg:"update done...",
        updateRes

    }
    res.send(resObj);
})

app.listen(8000); //russian