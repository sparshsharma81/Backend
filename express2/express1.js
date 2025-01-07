const express = require('express');
const app = express();
const path = require('path');
const { title } = require('process');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory (optional, defaults to './views')
app.set('views', path.join(__dirname, 'views'));

// Static file middleware
// app.use(express.static('public')); // Serve files from 'public' folder

// Routes
app.get('/', (req, res) => {
    res.render('index',{
        title:'Hello world'
    }); // Render the 'index.ejs' file from the 'views' folder
});

app.get('/about', (req, res) => {
    // const variable ="this is the variable";
    res.render('about',{
       title:"Hlo about section"
    }); // Render the 'about.ejs' file
});
app.get('/index', (req, res) => {
    res.render('about'); // Render the 'about.ejs' file
});

app.get('/download', (req, res) => {
    // const filePath = path.resolve(__dirname, 'views','index.ejs'); // Example file
    res.download(path.resolve(__dirname,) + 'index.ejs')
    //     if (err) {
    //         console.error('Error during download:', err);
    //         res.status(500).send('File download error.');
    //     }
    // });
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
