// routes/AuthRouter.ts
import { Router, Request, Response } from "express";
import { loginValidation, registerValidation } from "../middleware/AuthValidation";
import { login, register } from "../controllers/AuthController";  

const router: Router = Router();

router.post('/login', loginValidation, login); 

router.post('/register', registerValidation, register); 

export default router;

