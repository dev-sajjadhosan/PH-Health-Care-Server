import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/register", AuthController.registerPatient);
router.post("/login", AuthController.loginPatient);
router.post("/logout", AuthController.logoutPatient);

//register your from rs hey
export const AuthRoutes = router;


console.log();


console.log("", )