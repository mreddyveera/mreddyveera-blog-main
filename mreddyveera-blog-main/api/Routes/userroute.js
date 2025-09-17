import express from 'express';
const router=express.Router();
import verifyToken from "../utils/verifyUser.js";
import {updateUser} from '../Controllers/usercontroller.js';

router.put("/update/:userId", verifyToken, updateUser)

export default router;
