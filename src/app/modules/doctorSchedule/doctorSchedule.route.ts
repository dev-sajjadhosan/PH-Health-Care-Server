import { Router } from "express";
import {  Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { DoctorScheduleController } from "./doctorSchedule.controller";


const router = Router();

router.post("/create-my-doctor-schedule",
    checkAuth(Roles.DOCTOR),
     DoctorScheduleController.createMyDoctorSchedule);
router.get("/my-doctor-schedules", checkAuth(Roles.DOCTOR), DoctorScheduleController.getMyDoctorSchedules);
router.get("/", checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN), DoctorScheduleController.getAllDoctorSchedules);
router.get("/:doctorId/schedule/:scheduleId", checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN), DoctorScheduleController.getDoctorScheduleById);
router.patch("/update-my-doctor-schedule",
    checkAuth(Roles.DOCTOR),
    DoctorScheduleController.updateMyDoctorSchedule);
router.delete("/delete-my-doctor-schedule/:id", checkAuth(Roles.DOCTOR), DoctorScheduleController.deleteMyDoctorSchedule);

export const DoctorScheduleRoutes = router;