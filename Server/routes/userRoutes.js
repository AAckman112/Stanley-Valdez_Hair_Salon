//express is used to create the API
const express = require("express");
const {createUser, getAllUsers, getUser, updateUser, changePassword, deleteUser } = require("../controllers/userController.js");
const tokenValidator = require("../middleware/tokenValidator");

const router = express.Router();

//routes for the user actions, createUser, getAllUsers, and getUser
//uses POST request to the /api/users endpoint to create a new user
router.post("/", tokenValidator, createUser);
//uses GET request to the /api/users endpoint to get all users
router.get("/", tokenValidator, getAllUsers);
//uses GET request to the /api/users/:id endpoint to get a specific user
router.get("/:id", tokenValidator, getUser);
//uses PUT request to the /api/users/:id endpoint to update a specific user
router.put("/:id", tokenValidator, updateUser);
//router.put("/:id", tokenValidator, changePassword);
//uses DELETE request to the /api/users/:id endpoint to delete a specific user
router.delete("/:id", tokenValidator, deleteUser);

//exports the router object
module.exports = router;