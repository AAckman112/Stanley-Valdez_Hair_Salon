//this is crypt that will be used to hash the password before saving it to the database
const bcrypt = require('bcrypt');
//imports the user model so it can interact with the database
const User = require('../models/userModel');

//function that is used to create a new user in the database
module.exports.createUser = async (req, res) => {
    try {
        //if the role of the user is not an admin, it'll give an error when trying to create a user
        if(req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can create users.' });
        }

        //gets the name, username, password, and role from the request body
        const { firstName, lastName, username, password, role } = req.body;

        //if a field is blank it sends an error message
        if(!username || !password || !role){
            return res.status(409).json({error: "Please enter all fields"});
        }

        //sees if a new username already exists in the system
        const exist = await User.findOne({username});
        //if it does exist, it sends a taken message
        if(exist){
            return res.status(409).json({error: "Username is taken"})
        }

        //giving the user a new unique id
        const findLast = await User.findOne().sort({id: -1});
        const Id = findLast ? findLast.id + 1 : 1;

        //the hashed password that is saved to the database
        const hashPass = await bcrypt.hash(password, 10);

        //creating a new user in the database (has to match the database schema)
        const newUser = await User.create({
            id: Id,
            firstName,
            lastName,
            username,
            password: hashPass,
            role,
            lastLogin: null,
            lastPasswordChange: new Date(),
        });
        
        //saves the user to the database + sends a complete message
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        //if it doesn't work, it'll give a server error
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    };
};

//this function is used to get all the users in the database
module.exports.getAllUsers = async (req, res) => {
    try{
        //this will find all the users in the database and return them as an object
        const users = await User.find();
        res.status(200).json(users);

    }catch (error) {
        //if it doesn't work, it'll give a server error
        console.error(error);
        res.status(500).json({ message: 'Server error when fetching users' });
    };
};

//this function is used to get a specific user in the database
module.exports.getUser = async (req, res) => {
    try{
        //this will find a user in the database by their id
        //it also returns them as an object
        const user = await User.findById(req.params.id);

        //if the user is not found, it'll try to find them by their username
        if(!user) {
            user = await User.findOne({ username: req.params.id });
        }

        //if the user is still not found, it'll return a 404 error
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //if the user is found, it'll return them as an object
        res.status(200).json(user);

    } catch (error) {
        //if it doesn't work, it'll give a server error
        console.error(error);
        res.status(500).json({ message: 'Server error when fetching user' });
    }
};

//password change function (doesn't work yet)
/*
module.exports.changePassword = async (req, res) => {
    try{
        //gets the user id
        const userId = req.user.userId;

        //gets the new password from the request body
        const { newPassword } = req.body;

        //hashes the new password
        const hashPass = await bcrypt.hash(newPassword, 10);

        //finds the user in the database by their id
        const user = await User.findById(userId);

        //if the user is not found, it'll return a 404 error
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //updates the user's password and lastPasswordChange date
        user.password = hashPass;
        user.lastPasswordChange = new Date();

        //saves the updated user information to the database
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });

    }catch (error) {
        //if it doesn't work, it'll give a server error
        console.error(error);
        res.status(500).json({ message: 'Server error when changing password' });
    }
};*/

//Update operations
module.exports.updateUser = async (req, res) => {
    try {
        //gets the user id from the "req.params" which is the request parameters in the URL
        const updates = req.body;

        //finds the user in the database by their id
        const user = await User.findById(req.params.id).catch(() => null);


        if(!user){
            user = await User.findOne({id: parseInt(req.params.id) });
        }

        //if the user is not found it'll return an error
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //update user information
        //each line checks whether a new value was provided in the updates object
        user.firstName = updates.firstName ?? user.firstName;
        user.lastName = updates.lastName ?? user.lastName;
        user.username = updates.username ?? user.username;
        user.role = updates.role ?? user.role; 

        //could add more fields here like hair type, hair color...

        //saves the updated user information to the database
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        //if it doesn't work, it'll give a server error
        console.error(error);
        res.status(500).json({ message: 'Server error when updating user' });
    }
};

//Delete operations
module.exports.deleteUser = async (req, res) => {
    try{
        //this will try to delete the user by the MongoDB id first
        //findByIdAndDelete is a method in Mongoose, it finds a MongoDB document by unique _id
        let deletedUser = await User.findByIdAndDelete(req.params.id).catch(() => null);

        //if the user wasn't found in Mongo we can try to delete it by personal id
        if(!deletedUser){
            deletedUser = await User.findOneAndDelete({ id: parseInt(req.params.id)});
        }

        //if a user is still not found
        if(!deletedUser){
            return res.status(404).json({error: "User not found"});
        }

        //if user is successfully deleted 
        res.status(200).json({message: "User deleted"});

    }catch (error){
        //if it doesn't work, it'll give a server error
        console.error(error);
        res.status(500).json({ message: 'Server error when deleteing user' });
    }
};
