const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'temp/' });
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
const tempAuth = require('../middlewares/temp-token')

// router.use(tempAuth)

const url = process.env.API_URL

router.get('/settings', async (req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/settings`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
        res.render('admin/settings', {settings: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})


router.get('/login', async(req,res) => {

    try {
         res.render('admin/login')
    } catch(e) {
        console.log(e)
    }

})

router.post('/login', async (req, res) => {
  try {
 
    const response = await axios.post(`${url}/auth/login`, {
      email: req.body.email,
      password: req.body.password
    });

    req.session.token = response.data.accessToken; 

    res.redirect('/admin/dashboard');
  } catch(e) {
    // console.error(e);
    res.redirect('/admin/login');
  }
});


router.get('/dashboard', async(req,res) => {

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

router.get('/profile', async(req,res) => {

    try {

        const response = await axios.get(`${url}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/profile-info', {user: response.data, websiteUrl: url})
    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})



//ADD TEMPLATES

router.get('/experiences/add', (req,res) => {
    res.render('admin/experiences/add')
})

router.get('/projects/add', (req,res) => {
    res.render('admin/projects/add')
})

router.get('/skills/add', (req,res) => {
    res.render('admin/skills/add')
})

router.get('/titles/add', (req,res) => {
    res.render('admin/titles/add')
})

router.get('/educations/add', (req,res) => {
    res.render('admin/educations/add')
})






//EDIT TEMPLATES

router.get('/experience/edit/:id', async (req,res) => {
    try {
        
        const response = await axios.get(`${url}/portfolio/experience/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });

        res.render('admin/experiences/edit', {experience: response.data})

    } catch(e) {

    }
   
})

router.get('/projects/edit/:id', async (req,res) => {
    try {
        
        const response = await axios.get(`${url}/portfolio/project/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });

        res.render('admin/projects/edit', {project: response.data, url})

    } catch(e) {

    }
   
})

router.get('/skills/edit/:id', async (req,res) => {
    try {
        
        const response = await axios.get(`${url}/portfolio/skill/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });

        res.render('admin/skills/update', {skill: response.data})

    } catch(e) {

    }
   
})

router.get('/titles/edit/:id', async (req,res) => {
    try {
        
        const response = await axios.get(`${url}/portfolio/title/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });

        res.render('admin/titles/edit', {title: response.data})

    } catch(e) {

    }
   
})

router.get('/educations/edit/:id', async (req,res) => {
    try {
        
        const response = await axios.get(`${url}/portfolio/education/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });

        res.render('admin/educations/edit', {education: response.data})

    } catch(e) {

    }
   
})






//DATA TEMPLATES GET

router.get('/titles', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/titles`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/titles/titles', {titles: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})



router.get('/skills', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/skills`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/skills/skills', {skills: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})

// router.get('/portfolio', async(req,res) => {

//     try {

//         const response = await axios.get(`${url}/portfolio/projects`, {
//             headers: {
//                 Authorization: `Bearer ${req.session.token}`
//             }
//         });
        
//          res.render('admin/portfolio', {portfolios: response.data})

//     } catch(e) {
//         console.log(e)
//         res.redirect('/admin/login')
//     }

// })


router.get('/educations', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/educations`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/educations/educations', {studies: response.data})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})

router.get('/projects', async(req,res) => {

    try {

        const response = await axios.get(`${url}/portfolio/projects`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/projects/projects', {projects: response.data, url})

    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})

router.get('/experiences', async(req,res) => {

    try {

        const response = await axios.get(`${url}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${req.session.token}`
            }
        });
        
         res.render('admin/experiences/experiences', response.data)
    } catch(e) {
        console.log(e)
        res.redirect('/admin/login')
    }

})


//CREATIONS

router.post('/skills/create', async (req, res) => {

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

router.post('/titles/create', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/titles`
        const response = await axios.post( newUrl, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/titles');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/experience/create', async (req, res) => {

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

router.post('/education/create', async (req, res) => {

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

router.post('/skills/update', async (req, res) => {

    try {
        const {skill_id, name} = req.body
        const newUrl= `${url}/portfolio/skills/${skill_id}`
        await axios.patch( newUrl,{name},{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        res.redirect('/admin/skills');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/titles/update', async (req, res) => {

    try {
        const {title_id, title} = req.body
        const newUrl= `${url}/portfolio/titles/${title_id}`
        await axios.patch( newUrl,{title},{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        res.redirect('/admin/titles');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/education/update/:id', async (req, res) => {

    try {

        const {id} = req.params
        const newUrl= `${url}/portfolio/educations/${id}`
        await axios.patch( newUrl, req.body,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        res.redirect('/admin/educations');
  } catch(e) {
      console.log(e)
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/experience/update/:id', async (req, res) => {

    try {

        const {id} = req.params
        const newUrl= `${url}/portfolio/experiences/${id}`
        await axios.patch( newUrl, req.body,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        res.redirect('/admin/experiences');
  } catch(e) {
      console.log(e)
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});



router.post('/project/delete/:id', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/projects/${req.params.id}`
        const response = await axios.delete( newUrl,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });


        res.redirect('/admin/projects');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/settings/update', async (req, res) => {

    try {
        const newUrl= `${url}/portfolio/settings/${req.body.settings_id}`
        console.log(newUrl)
        console.log(req.session.token)
        const response = await axios.patch( newUrl,req.body,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });


        res.redirect('/admin/settings');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});


router.post('/experience/delete/:id', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/experiences/${req.params.id}`
        const response = await axios.delete( newUrl,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });


        res.redirect('/admin/experiences');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/education/delete/:id', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/educations/${req.params.id}`
        const response = await axios.delete( newUrl,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });


        res.redirect('/admin/educations');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/dashboard');
    }

    // clear cookie (important)
    res.clearCookie('connect.sid');
    res.redirect('/admin/login');
  });
});

router.post('/experiences', async (req, res) => {

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


router.post('/projects', async (req, res) => {

    try {
        
        const newUrl= `${url}/portfolio/projects`
        const response = await axios.post( newUrl, req.body, {
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        

        res.redirect('/admin/projects');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/skills', async (req, res) => {

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



router.post('/educations', async (req, res) => {

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

router.post('/skills/delete/:id', async (req, res) => {

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

router.post('/titles/delete/:id', async (req, res) => {

    try {
        
        console.log(req.session.token)
        const newUrl= `${url}/portfolio/titles/${req.params.id}`
        const response = await axios.delete( newUrl,{
            headers: {
                Authorization: `Bearer ${req.session.token}` // if your API needs a token
            }
        });

        console.log(response.data)

        res.redirect('/admin/titles');
  } catch(e) {
      console.error('Axios error:', e.response?.status, e.response?.data, e.message);
    res.status(500).send('Error');
  }
});

router.post('/profile/:id', async (req, res) => {

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


router.post('/upload/profile', upload.single('file'), async (req, res) => {
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
    res.redirect('/admin/login');
  }
});

router.post('/upload/cv', upload.single('file'), async (req, res) => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype, // preserves MIME type
    });

    await axios.post(`${url}/upload/cv`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${req.session.token}`,
      },
    });

    fs.unlinkSync(req.file.path); // delete temp file
    res.redirect('/admin/profile');
  } catch (e) {
    console.error(e.response?.data || e);
    res.redirect('/admin/login');
  }
});



router.post('/projects/create', upload.single('file'), async (req, res) => {
  try {

    const newUrl= `${url}/portfolio/projects`
    const response = await axios.post( newUrl, req.body, {
        headers: {
            Authorization: `Bearer ${req.session.token}` // if your API needs a token
        }
    });

    const projectId = response.data.id

    if(req.file) {
        const form = new FormData();
        form.append('file', fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
        contentType: req.file.mimetype, // preserves MIME type
        });

        await axios.post(`${url}/upload/projects/cover/${projectId}`, form, {
        headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${req.session.token}`,
        },
        });

        fs.unlinkSync(req.file.path); // delete temp file
    }

   
    res.redirect('/admin/projects');
  } catch (e) {
    console.error(e.response?.data || e);
    res.redirect('/admin/login');
  }
});


router.post('/projects/update/:id', upload.single('file'), async (req, res) => {
  try {

    const id = req.params.id
    const newUrl= `${url}/portfolio/projects/${id}`
    const response = await axios.patch( newUrl, req.body, {
        headers: {
            Authorization: `Bearer ${req.session.token}` // if your API needs a token
        }
    });

    const projectId = response.data.id

    if(req.file) {
        const form = new FormData();
        form.append('file', fs.createReadStream(req.file.path), {
        filename: req.file.originalname,
        contentType: req.file.mimetype, // preserves MIME type
        });

        await axios.post(`${url}/upload/projects/cover/${projectId}`, form, {
        headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${req.session.token}`,
        },
        });

        fs.unlinkSync(req.file.path); // delete temp file
    }

  
    res.redirect('/admin/projects');
  } catch (e) {
    console.error(e.response?.data || e);
    res.redirect('/admin/login');
  }
});




module.exports = router

