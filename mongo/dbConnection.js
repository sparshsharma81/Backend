const { MongoClient } = require('mongodb');

let dbConnectionUrl = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(dbConnectionUrl);

let dbConnection = async()=>{
    await client.connect();
    let db = client.db("mongoDBProject_DataBase")
    return db;
}

module.exports ={dbConnection}


