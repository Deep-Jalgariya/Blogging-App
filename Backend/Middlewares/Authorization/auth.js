const CustomError = require("../../Helpers/error/CustomError");
const User = require("../../Models/user")
const jwt = require("jsonwebtoken");
const asyncErrorWrapper =require("express-async-handler")
const { isTokenIncluded ,getAccessTokenFromHeader} = require("../../Helpers/auth/tokenHelpers");


const getAccessToRoute = asyncErrorWrapper(async(req,res,next) =>{

    const { JWT_SECRET, JWT_SECRET_KEY, NODE_ENV } = process.env;

    if(!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route ", 401))
    }

    const accessToken = getAccessTokenFromHeader(req)
    
    // Validate token format
    if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
        return next(new CustomError("Invalid token format", 401))
    }

    const secret = JWT_SECRET || JWT_SECRET_KEY || (NODE_ENV !== 'production' ? 'dev-secret' : undefined)
    if (!secret) {
        return next(new CustomError("JWT secret is not configured on the server", 500))
    }

    try {
        const decoded = jwt.verify(accessToken, secret);
        
        if (!decoded || !decoded.id) {
            return next(new CustomError("Invalid token payload", 401))
        }

        const user = await User.findById(decoded.id)
       
        if(!user) {
            return next(new CustomError("User not found or token is invalid", 401))
        }

        req.user = user ; 
        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new CustomError("Invalid token", 401))
        }
        if (error.name === 'TokenExpiredError') {
            return next(new CustomError("Token expired", 401))
        }
        return next(new CustomError("Token verification failed", 401))
    }

})



module.exports ={getAccessToRoute}