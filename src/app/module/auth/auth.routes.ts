import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/register", AuthController.registerPatient);
router.post("/login", AuthController.loginPatient);
router.post("/logout", AuthController.logoutPatient);

export const AuthRoutes = router;
