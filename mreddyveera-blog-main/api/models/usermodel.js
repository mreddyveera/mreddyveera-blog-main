import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png"
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true}); 

const userModel=mongoose.model('User',userSchema);

export default userModel;