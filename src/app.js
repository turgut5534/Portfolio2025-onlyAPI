const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'temp/' });
const FormData = require('form-data');
const fs = require('fs');


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

const url = process.env.WEBSITE_URL

app.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(`${url}/info`, {
            headers: {
                'X-Portfolio-Domain': 'turgutsalgin.com'
            }
        });

         const data = response.data;

             res.render('index', { title: 'Home Page' , user:data, url}); 

    } catch(e) {
        console.log(e)
        res.render('404')
    }

});

app.get('/admin/login', async(req,res) => {

    try {
         res.render('admin/login')
    } catch(e) {
        // console.log(e)
    }

})

app.get('/admin/dashboard', async(req,res) => {

    try {

        const response = await axios.get(`${url}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/dashboard')
    } catch(e) {
        // console.log(e)
        res.redirect('/admin/login')
    }

})


app.get('/admin/experiences', async(req,res) => {

    try {

        const response = await axios.get(`${url}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/experiences', response.data)
    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})


app.get('/admin/profile', async(req,res) => {

    try {

        const response = await axios.get(`${url}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/profile-info', {user: response.data, websiteUrl: process.env.WEBSITE_URL})
    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})

app.get('/admin/skills', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/skills`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/skills', {skills: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})

app.get('/admin/portfolio', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/projects`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/portfolio', {portfolios: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})


app.get('/admin/educations', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/educations`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/educations', {studies: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})

app.get('/admin/projects', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/projects`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/projects', {projects: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})


app.post('/upload/profile', upload.single('file'), async (req, res) => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype, // preserves MIME type
    });

    await axios.post(`${url}/upload/profile`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${req.session.token}`,
      },
    });

    fs.unlinkSync(req.file.path); // delete temp file
    res.redirect('/admin/profile');
  } catch (e) {
    console.error(e.response?.data || e);
    res.redirect('/login');
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const response = await axios.post(`${url}/auth/login`, {
      email: req.body.email,
      password: req.body.password
    });

    req.session.token = response.data.accessToken; 
    res.redirect('/admin/dashboard');
  } catch(e) {
    console.error(e);
    res.redirect('login');
  }
});


app.post('/portfolio/profile/:id', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/profiles/${req.params.id}`
        console.log(newUrl)
        const response = await axios.patch( newUrl, req.body, {
    headers: {
        Authorization: `Bearer ${req.session.token}` // if your API needs a token
    }
    });

    console.log(response.data)

    res.redirect('/admin/profile');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

app.post('/admin/experiences', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/experiences`
        const response = await axios.post( newUrl, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/experiences');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});


app.post('/admin/projects', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/projects`
        const response = await axios.post( newUrl, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/projects');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

app.post('/admin/skills', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/skills`
        const response = await axios.post( newUrl, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/skills');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});



app.post('/admin/educations', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/educations`
        const response = await axios.post( newUrl, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/educations');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

app.post('/admin/skills/delete/:id', async (req, res) => {

    try {
        
        console.log(req.session.token)
        const newUrl= `${url}/portfolio/skills/${req.params.id}`
        const response = await axios.delete( newUrl,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/skills');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});


app.get('/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/admin/dashboard');
    }

    // clear cookie (important)
    res.clearCookie('connect.sid');
    res.redirect('/admin/login');
  });
});


app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
