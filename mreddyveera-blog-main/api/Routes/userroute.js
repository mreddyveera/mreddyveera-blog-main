const express=require('express');
const router=express.Router();
const controller=require('../Controllers/usercontroller.js');

router.get('/sayHello',controller.sayHello);
module.exports=router;
