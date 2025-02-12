const express = require('express');
const app = express();
const port = 4000;

app.get('/',(req,res)=>{
    res.send('hello g25 from express.js');

});
app.listen(port,()=>{
    console.log(`server is running on localhost:${port}`);
})


//callback functions are those functions in which another functions is pass as an arrgument in other function...
