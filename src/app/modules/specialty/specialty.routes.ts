import { Router } from "express";
import { Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { SpecialtyController } from "./specialty.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { SpecialtyValidation } from "./specialty.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.PATIENT),
  multerUpload.single("file"),
  validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
  SpecialtyController.createSpecialty,
);
router.get("/", SpecialtyController.getAllSpecialties);
router.delete(
  "/:id",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  SpecialtyController.deleteSpecialty,
);

export const SpecialtyRoutes = router;
