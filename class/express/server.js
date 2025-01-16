const express = require('express');

// console.log('Hello world')
const app = express();
require('dotenv').config();
app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
