import { Router } from "express";
import {  Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { ScheduleController } from "./schedule.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { ScheduleValidation } from "./schedule.validation";

const router = Router();

router.post('/', checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN), validateRequest(ScheduleValidation.createScheduleZodSchema) , ScheduleController.createSchedule);
router.get('/', checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.DOCTOR), ScheduleController.getAllSchedules);
router.get('/:id', checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.DOCTOR), ScheduleController.getScheduleById);
router.patch('/:id', checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),validateRequest(ScheduleValidation.updateScheduleZodSchema), ScheduleController.updateSchedule);
router.delete('/:id', checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN), ScheduleController.deleteSchedule);

export const scheduleRoutes = router;