//mongoose connection is to the database (mongo - mongoose)
const mongoose = require("mongoose");
//how you get access to path variables
const path = require("path");
//express is the (router) backend server
const express = require("express");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

//storing the express server in a variable to activate later
const app = express();
//setting the port for the server
const PORT = process.env.PORT || 3000;
//allows for access to the .env file for the mongo connection
const MONGO_URI = process.env.MONGO_URI;

//turns on the express server; makes the connection
app.use(express.json());

//says that all the html files will be in this folder
//when getting to react this will be commented out
app.use(express.static(path.join(__dirname, "../client/public")));

//connects to the mongo database using the MONGO_URI
mongoose.connect(MONGO_URI)
    //called a promise; if the connection is successful, it will log to the console
    .then(() => console.log("Connected to MongoDB"))
    //if the connection is unsuccessful, it will log to the console and exit the process
    .catch(error => {
        console.log("Could not connect to MongoDB", error);
        process.exit(1);
    })

//telling the router to get user starting req/res 
app.get("/", (req, res) => {
    //then send the response back to the start page  
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

//if no landing page, send a 404 error
app.use((req,res) => {
    res.status(404).send("404: Page not found");
});

//telling the server where the back end is running 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});