//
const jwt = require ('jsonwebtoken');

function tokenValidator(req, res, next){
    try{
        //
        const authHeader = req.headers['authorization'];

        //If there is no token provided
        if(!authHeader){
            return res.status(401).json({error: "No token provided"});
        }

        //this will remove bearer from authHeader
        const token = authHeader.split(' ')[1];

        //if the token has the wrong format
        if(!token){
            return res.status(401).json({error: "Wrong format for token"});
        }

        //this is how the token will be verified 
        //verifies with the JWT_SECRET KEY
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("token (decoded): ", decoded);
        req.user = decoded;

        next();
    }catch(error){
        return res.status(401).json({error: "Expired token"});
    }

}

module.exports = tokenValidator;