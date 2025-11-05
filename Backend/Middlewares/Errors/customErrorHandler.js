const CustomError = require("../../Helpers/error/CustomError")

const customErrorHandler = (err,req,res,next)=> {
   
    let error = { ...err }
    error.message = err.message

    if (err.code == 11000) {
        error = new CustomError("Duplicate Field Value Enter " , 400)
    }

    if (err.name === 'SyntaxError') {
        error = new CustomError('Unexpected Syntax ', 400)
    }
    
    if (err.name === 'ValidationError') {
        error = new CustomError(err.message, 400)
    }

    if (err.name === "CastError") {
        error = new CustomError("Please provide a valid id  ", 400)
    }
    
    if (err.name === "TokenExpiredError") {
        error = new CustomError("Token has expired. Please login again.", 401)
    }
    
    if (err.name === "JsonWebTokenError") {
        let message = "Invalid token. Please login again."
        
        // Provide more specific error messages for debugging
        if (err.message.includes('malformed')) {
            message = "Token is malformed. Please login again."
        } else if (err.message.includes('invalid signature')) {
            message = "Token signature is invalid. Please login again."
        } else if (err.message.includes('jwt must be provided')) {
            message = "No token provided. Please login."
        }
        
        error = new CustomError(message, 401)
    }

    // Log detailed error information for debugging
    console.log("Custom Error Handler => ", {
        name: err.name,
        message: err.message,
        statusCode: error.statusCode || 500,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
  
    return res.status(error.statusCode || 500)
    .json({
        success: false,
        error: error.message || "Server Error",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })

}


module.exports = customErrorHandler
