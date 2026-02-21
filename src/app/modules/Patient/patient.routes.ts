import express, { NextFunction, Request, Response } from "express";
import { PatientController } from "./patient.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { PatientValidation } from "./patient.validation";
import { Roles } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import {
  IUpdatePatientInfoPayload,
  IUpdatePatientProfilePayload,
} from "./patient.interface";
import { updateMyPatientProfileMiddleware } from "./patient.middleware";

const router = express.Router();



router.patch(
  "/update-my-profile",
  checkAuth(Roles.PATIENT),
  multerUpload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "medicalReports", maxCount: 5 },
  ]),
  updateMyPatientProfileMiddleware,
  validateRequest(PatientValidation.updatePatientProfileZodSchema),
  PatientController.updateProfile,
);

export const PatientRoutes = router;
