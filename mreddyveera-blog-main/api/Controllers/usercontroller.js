const sayHello=async(req,res)=>{
    return res.status(200).json({message:"User already exists"});
}
module.exports={sayHello};