//this is the authentication routes file, which handles the routes for user authentication
//const express is a library that allows for the creation of web servers and APIs
const express = require('express');

//const router is an instance of the express router,
//which allows for the creation of routes for the APIs
const router = express.Router();
//importing the authenticateUser function from the authController.js file
const { authenticateUser } = require('../controllers/authController');

//route for user login
//the route is a POST request to the /login endpoint, which is used to authenticate users
router.post('/login', authenticateUser);

//module.exports is used to export the router object, which allows it to be used in other files
module.exports = router;