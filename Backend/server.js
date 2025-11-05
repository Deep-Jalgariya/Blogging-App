const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config({
    path:  path.join(__dirname, 'Config', 'config.env')
})

// Validate critical environment variables early
if (!process.env.JWT_SECRET && !process.env.JWT_SECRET_KEY) {
    console.error("FATAL: Missing JWT secret. Set JWT_SECRET in Backend/Config/config.env");
    process.exit(1);
}

// Log configuration for debugging (in development only)
if (process.env.NODE_ENV === 'development') {
    console.log("JWT Configuration:", {
        hasJWT_SECRET: !!process.env.JWT_SECRET,
        hasJWT_SECRET_KEY: !!process.env.JWT_SECRET_KEY,
        JWT_EXPIRE: process.env.JWT_EXPIRE,
        NODE_ENV: process.env.NODE_ENV
    });
}

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors())

app.use("/",IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT || 5001 ;

app.use(express.static(path.join(__dirname , "public") ))

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})