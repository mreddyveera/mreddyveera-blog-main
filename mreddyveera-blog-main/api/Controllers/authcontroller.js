const userModel=require('../models/usermodel.js');
const bcryptjs=require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt=require("jsonwebtoken");
const signup=async(req,res,next)=>{
    //Accessing the body of a post request

    const {username,email,password}=req.body;
    if(!username || !email || !password ||username==="" ||email==="" || password===""){
        return next(errorHandler(400,"All fields are required"));
    }
    //USING BCRYPT MODULE TO HASHING THE PASSWORDS
    const hashedPassword=bcryptjs.hashSync(password,10);
    try{
    let userExists=await userModel.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User already exists please Sign in"});
    }
    else{
    const newUser=new userModel({
        username,
        email,
        password:hashedPassword
    });
    await newUser.save();
    return res.status(201).json({message:`New user ${username} has been created successfully`});
}
}
//passing the error to next object
catch(e){
    next(e);
}

}

const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log(req.body);
    
// username is null, undefined, false, 0, NaN, or "" (empty string).
    if(!email || !password){
        next(errorHandler(400,'All fields are required'));
    }
    try{
        const validUser=await userModel.findOne({email});
        if(!validUser){
            return next(errorHandler(400,"Email not found"));
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password"));
        }

        //npm i jsonwebtoken
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        //we dont want to expose the password to cookie whether it is hashed or not
        const {password:pass,...rest}=validUser;
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);




    }
    catch(error){
        next(error);
    }

}
module.exports={signup,signin};