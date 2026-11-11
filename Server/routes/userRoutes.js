//express is used to create the API
const express = require("express");
const {createUser, getAllUsers, getUser, updateUser, changePassword, deleteUser } = require("../controllers/userController.js");
const tokenValidator = require("../middleware/tokenValidator");

const router = express.Router();

//function requireAdmin will check if a user is an admin before allowing them to access certain routes
/*function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
    }
    next();
    //if used, need to add requireAdmin to routes below inbetween tokenValidator and the function
}*/

//routes for the user actions, createUser, getAllUsers, and getUser
//uses POST request to the /api/users endpoint to create a new user
router.post("/", tokenValidator, createUser);
//uses GET request to the /api/users endpoint to get all users
router.get("/", tokenValidator, getAllUsers);
//uses GET request to the /api/users/:id endpoint to get a specific user
router.get("/:id", tokenValidator, getUser);
//uses PUT request to the /api/users/:id endpoint to update a specific user
router.put("/:id", tokenValidator, updateUser);
//uses PUT request to the /api/users/:id/change-password endpoint to change a specific user's password
router.put("/:id/change-password", tokenValidator, changePassword);
//uses DELETE request to the /api/users/:id endpoint to delete a specific user
router.delete("/:id", tokenValidator, deleteUser);

//exports the router object
module.exports = router;