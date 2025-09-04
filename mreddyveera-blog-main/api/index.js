const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRoute=require('./Routes/userroute.js');
const authRoute=require('./Routes/authroute.js');
const cors = require("cors");

// The dotenv.config() function in a Node.js application reads a specified .env file, parses its contents, and injects the defined key-value pairs into the process.env object.
//  This allows the application to access these environment variables throughout its code using process.env.VARIABLE_NAME
dotenv.config();
//connectimng with database
mongoose.connect(process.env.mongo_url).then(console.log("Database connection established successfully"));
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
//starting a bacjend server using listen method
app.listen(3000,()=>{
    console.log(`Server started on server 3000`);
});
//Handling all type of errors
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const errMessage=err.message||'Internal Server Error';
    return res.status(statusCode).json({success:false,
        statusCode,
        errMessage
    });
});