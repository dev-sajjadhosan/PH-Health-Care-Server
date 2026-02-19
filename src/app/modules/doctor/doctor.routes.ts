import { Router } from "express";
import { Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { DoctorController } from "./doctor.controller";
import { updateDoctorZodSchema } from "./dcotor.validation";


const router = Router();

router.get("/",
    checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
    DoctorController.getAllDoctors);
router.get("/:id",
    checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
    DoctorController.getDoctorById);
router.patch("/:id",
    checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
    validateRequest(updateDoctorZodSchema), DoctorController.updateDoctor);
router.delete("/:id",
    checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
    DoctorController.deleteDoctor);

export const DoctorRoutes = router;