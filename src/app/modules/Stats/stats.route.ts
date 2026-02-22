import express from 'express';
import { Roles } from '../../../generated/prisma/browser';
import { checkAuth } from '../../middleware/checkAuth';
import { StatsController } from './stats.controller';

const router = express.Router();

router.get(
    '/',
    checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT),
    StatsController.getDashboardStatsData
)


export const StatsRoutes = router;