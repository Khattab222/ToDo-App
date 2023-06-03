import { Router } from "express";
import * as user_controller from './user.controller.js'
import { validation } from '../../middlewares/validation.js';
import { loginValidationSchema, signupValidationSchema } from "./user.validation.js";
import { auth } from './../../middlewares/authintication.js';
const router = Router();


router.post('/signup' , validation(signupValidationSchema), user_controller.signUp);
router.get('/login',validation(loginValidationSchema),user_controller.login)
router.delete('/:id',auth(),user_controller.deleteprofile)
router.put('/update',auth(),user_controller.updateprofile)
router.get('/logout',auth(),user_controller.logOut)





export default router;