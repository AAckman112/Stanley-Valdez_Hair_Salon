//handles authentication and authorization of users
//jwt is a library that allows the creation and verification of JSON Web Tokens (secure authentication)
const jwt = require("jsonwebtoken");
//bcrypt is a library that allows for hashing and comparing passwords securely
const bcrypt = require("bcrypt");
//importing the user model to interact with the database
const User = require("../models/userModel");

// Function to authenticate user
//async function that takes a request and response object as parameters, which are used to handle the HTTP request and response
module.exports.authenticateUser = async (req, res) => {
    try {
        // Extract username and password from the request body
        //takes the username and password from the request body, which is sent by the user when they try to log in
        const { username, password } = req.body;
        
        // Check if username and password are not null and/or empty
        if(!username || !password) {
            //returns a 400 error to the user, which is the bad request error code
            //this code means the users entered data is invalid or missing, and the server cannot process the request
            return res.status(400).json({ message: "Username and password are required" });
        }

        // finding the user in the database by their username
        //waits for the database to return the user before moving on; parameter is the username entered by the user
        const user = await User.findOne({ username });

        //throws an error if the user is not found in the database
        if(!user) {
            //returns a 401 error to the user, which is the unauthorized error code
            //this code means the user is not authorized to access the requested resource 
            return res.status(401).json({ message: "Invalid username or password" });
        }

        //compare the password given with the crypted password in the database using bcrypt
        //waits for the comparison to finish before moving on; parameters are the password given first and the actual password

        /* <= delete when passwords are hashed
        const isMatch = await bcrypt.compare(password, user.password);
        */
       
        const isMatch = password === user.password;

        //throws an error if the password does not match
        if(!isMatch) {
            //if its not a match, returns an error 401, which is the missing authorization error code
            return res.status(401).json({ message: "Invalid username or password" });
        }
        

        //makes a token
        const token = jwt.sign(
            //the token contains the user id, username, and role of user
            { userId: user.id, username: user.username, role: user.role },
            //the secret key is stored in the .env file for security reasons
            process.env.JWT_SECRET,
            //the token will expire in 1 hour
            { expiresIn: "1h" }
        );

        //updates the last login time of the user to the current date and time
        user.lastLogin = new Date();
        //saves the updated user information to the database
        await user.save();

        console.log(`User ${user.username} authenticated successfully at ${user.lastLogin}`);
        return res.json({message: "Login successful", token, role: user.role});
        
    } catch (error) {
        //logs the error to the console
        console.error("Error occurred while authenticating user:", error);
        //returns a 500 error to the user, which is the internal server error code 
        //this code means something went wrong on the server side, not the user's fault
        return res.status(500).json({ message: "Internal server error" });
    }
};
