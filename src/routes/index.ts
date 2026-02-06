import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.routes";

const router = Router();

router.use("/specialties", SpecialtyRoutes);

export const indexRoutes = router;
