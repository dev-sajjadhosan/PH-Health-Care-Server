import { Router } from "express";
import { Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";

const router = Router()

router.post("/register", AuthController.registerPatient)
router.post("/login", AuthController.loginUser)
router.get("/me", checkAuth(Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT, Roles.SUPER_ADMIN), AuthController.getMe)
router.post("/refresh-token", AuthController.getNewToken)
router.post("/change-password", checkAuth(Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT, Roles.SUPER_ADMIN), AuthController.changePassword)
router.post("/logout", checkAuth(Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT, Roles.SUPER_ADMIN), AuthController.logoutUser)
router.post("/verify-email", AuthController.verifyEmail)
router.post("/forget-password", AuthController.forgetPassword)
router.post("/reset-password", AuthController.resetPassword)

router.get("/login/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/oauth/error", AuthController.handleOAuthError);

export const AuthRoutes = router;