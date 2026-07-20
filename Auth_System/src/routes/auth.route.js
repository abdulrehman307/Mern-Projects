import { Router } from "express";
import * as authcontrollers from '../controllers/auth.controller.js';

const authRouter= Router();

authRouter.post('/Register', authcontrollers.register);// Yahan sirf apis ko define kia jata hai api ko control krny k lia controllers folder mn kia jaata hai

authRouter.post('/login', authcontrollers.login);
authRouter.get('/Getme',authcontrollers.getme);
authRouter.get('/refresh-token',authcontrollers.refreshToken);

authRouter.get('/logout',authcontrollers.logout);


//Logout from all
authRouter.get('/logout-all',authcontrollers.logoutAll);

authRouter.post('/verify-email',authcontrollers.verifyEmail);


export default authRouter;