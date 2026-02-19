import { Router } from "express";
import { Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { AppointmentController } from "./appointment.controller";

const router = Router();

router.post("/book-appointment", checkAuth(Roles.PATIENT), AppointmentController.bookAppointment);
router.get("/my-appointments", checkAuth(Roles.PATIENT, Roles.DOCTOR), AppointmentController.getMyAppointments);
router.patch("/change-appointment-status/:id", checkAuth(Roles.PATIENT, Roles.DOCTOR, Roles.ADMIN, Roles.SUPER_ADMIN),AppointmentController.changeAppointmentStatus);
router.get("/my-single-appointment/:id", checkAuth(Roles.PATIENT, Roles.DOCTOR), AppointmentController.getMySingleAppointment);
router.get("/all-appointments", checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN), AppointmentController.getAllAppointments);
router.post("/book-appointment-with-pay-later", checkAuth(Roles.PATIENT), AppointmentController.bookAppointmentWithPayLater);
router.post("/initiate-payment/:id", checkAuth(Roles.PATIENT), AppointmentController.initiatePayment);

export const AppointmentRoutes = router;