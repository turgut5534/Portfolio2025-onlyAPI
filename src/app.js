const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');


const adminRouter = require('./routers/admin.router')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if using HTTPS
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/admin', adminRouter)

const url = process.env.API_URL
const port = process.env.PORT || 3002

app.get('/', async (req, res) => {

    try {
        
        const domain = process.env.DOMAIN_NAME
        const response = await axios.post(`${url}/info`, {
            domain: domain
        });

        const data = response.data;

        if(data.settings.maintanence_enabled) {
            return res.render('maintanence')
        }

        res.render('index', { title: 'Home Page' , user:data, url}); 

    } catch(e) {
        console.log(e)
        res.render('404')
    }

});



app.get('/project/:id', async (req, res) => {

    try {
        
        const response = await axios.get(`${url}/project/${req.params.id}`);

        const data = response.data;

        if(!data) {
            res.redirect('/')
        }
        console.log(response.data)

        res.render('portfolio-details', { title: 'Detail' , user: data.user, project: data, url}); 

    } catch(e) {
        console.log(e)
        res.render('404')
    }

});

app.use((req, res) => {
    res.redirect('/');
});


app.listen(port, () => {
    console.log('Server is running on http://localhost:3002');
});
