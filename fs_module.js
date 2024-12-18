const fs = require("fs");
fs.readFileSync("content.txt");
console.log(data);

let data = fs.readFileSync("content.txt","utf-8");//code is converted into text using the utf-8
console.log(data);


console.log(typeof(obj));
let jsonstring = JSON.stringify(obj);
console.log(typeof(jsonstring));
console.log(jsonstring);


//sync --- blocking operations.
//let result = fs.readfilesync('file.txt',"utf8");
//console.log(result);

//async ->non blocking operations

fs.readFile("file.txt","utf8",(error,data )=>{
    if(error){
        throw error;

    }
    else{
        console.log(data);
    }
})
console.log("hello 2");