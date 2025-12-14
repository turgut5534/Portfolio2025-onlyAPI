const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', async (req, res) => {

    try {
    const response = await axios.get('https://api.portfolio.turgutsalgin.com/info', {
            headers: {
                'X-Portfolio-Domain': 'turgutsalgin.com'
            }
        });

         const data = response.data;

             res.render('index', { title: 'Home Page' , user:data}); 

    } catch(e) {
        console.log(e)
        res.render('404')
    }

   


});

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
