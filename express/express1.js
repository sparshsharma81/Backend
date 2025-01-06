const express = require('express');
const app = express();
const path = require('path');

// app.set('view engine','ejs') //it store the key and value..
app.set('view engine', 'ejs');

// Set the views directory (optional, defaults to './views')
// app.set('views', path.join(__dirname, 'views'));


//now we are using static middleware---
// app.use(express.static('public')) //now all the static files are in static folder...
//in this we have to tell which is static folder--here public is the static folder where our static files are present...
//we will create a new folder called as public -- we can name it anything



// app.get('/',(req,res)=>{
//     // res.send("<h1>Hello world to kaise hai app log</h1>");
//     res.sendFile(path.resolve(__dirname)+'/index.html');
// })

app.get('/',(req,res)=>{
    res.render('index');
})     

app.get('/about', (req, res) => {
    res.render('about'); // Render the 'about.ejs' file
}); 


app.get('/about',(req,res)=>{
    // res.send("<h1>Hello world to kaise hai app log</h1>");
    res.sendFile(path.resolve(__dirname)+'/about');
})
app.get('/index',(req,res)=>{
    // res.send("<h1>Hello world to kaise hai app log</h1>");
    res.sendFile(path.resolve(__dirname)+'/index');
})
app.get('/download',(req,res)=>{
    res.download(path.resolve(__dirname)+'/about');

})
    

app.listen(4000,()=>{
    console.log("Hello world");
});