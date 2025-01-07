const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Example route
app.get('/', (req, res) => {
    res.render('index'); // Ensure 'index.ejs' exists in the 'views' folder
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
