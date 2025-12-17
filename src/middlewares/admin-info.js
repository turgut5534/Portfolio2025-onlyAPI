const axios = require('axios');

const url = process.env.API_URL


async function fetchUser(req, res, next) {
  try {
    // Skip if already in session
    if (!req.session.user && req.session.token) {
      const response = await axios.get(`${url}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${req.session.token}`
        }
      });

      req.session.user = response.data; // store user in session
    }

    // Expose user to EJS templates
    res.locals.user = req.session.user || null;

    next();
  } catch (err) {
    console.error('Error fetching user:', err.message);
    // Redirect to login if fetching fails
    return res.redirect('/admin/login');
  }
}

module.exports = fetchUser