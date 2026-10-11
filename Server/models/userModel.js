// connection to the database functions
const mongoose = require('mongoose');

//Allows us to create a schema for the model
const Schema = mongoose.Schema;

//bare minimum schema for the user model, can be expanded later
const userSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: String,
    lastLogin: Date,
    lastPasswordChange: Date
    /*add in:
        HairType: String
        After epic2 
    */
});
//exports the model so it can be used in other files later on
module.exports = mongoose.model('User', userSchema);
