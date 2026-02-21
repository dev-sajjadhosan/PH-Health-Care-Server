import express from 'express';
import { Roles } from '../../../generated/prisma/enums';
import { checkAuth } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionValidation } from './prescription.validation';

const router = express.Router();

router.get(
    '/',
    checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN),
    PrescriptionController.getAllPrescriptions
);

router.get(
    '/my-prescriptions',
    checkAuth(Roles.PATIENT, Roles.DOCTOR),
    PrescriptionController.myPrescriptions
)

router.post(
    '/',
    checkAuth(Roles.DOCTOR),
    validateRequest(PrescriptionValidation.createPrescriptionZodSchema),
    PrescriptionController.givePrescription
)

router.patch(
    '/:id',
    checkAuth(Roles.DOCTOR),
    validateRequest(PrescriptionValidation.updatePrescriptionZodSchema),
    PrescriptionController.updatePrescription
)

router.delete(
    '/:id',
    checkAuth(Roles.DOCTOR),
    PrescriptionController.deletePrescription
)


export const PrescriptionRoutes = router;