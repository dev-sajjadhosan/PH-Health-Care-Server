import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.routes";
import { AuthRoutes } from "../module/auth/auth.routes";
import { UserRoutes } from "../module/user/user.routes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/managements", UserRoutes); // staff, internal, accounts, directory
router.use("/specialties", SpecialtyRoutes);

export const indexRoutes = router;
