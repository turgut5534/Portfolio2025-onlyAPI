const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', async (req, res) => {

    const response = await axios.get('http://192.168.0.7:3000/info');
    const data = response.data;

    res.render('index', { title: 'Home Page' , user:data}); 
});

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
