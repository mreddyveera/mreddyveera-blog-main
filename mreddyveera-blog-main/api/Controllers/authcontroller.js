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
const google=async(req,res,next)=>{
    const {email,name,googlePhotoUrl}=req.body;
    console.log(req.body);
    try{
        const userExists=await userModel.findOne({email});
        if(userExists){
            const token=jwt.sign({id:userExists._id},process.env.JWT_SECRET);
            const {password,...rest}=userExists._doc;
            console.log("123");
            res.status(200).cookie("access_token",token,{
                httpOnly:true,
            }).json(rest);
        }else{
            const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashPassword=bcryptjs.hashSync(generatePassword,10);
            const newUser=new userModel({
                username:name.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4),
                password:hashPassword,
                profilePicture:googlePhotoUrl,
                email:email,

            });
            console.log("456");
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password,...rest}=newUser._doc;
            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        }
    } catch(error){
        console.log(error.message);
    }
}
module.exports={signup,signin,google};