import { Router } from "express";
import { Roles } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { updateAdminZodSchema } from "./admin.validation";

const router = Router();

router.get(
  "/",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  AdminController.getAllAdmins,
);
router.get(
  "/:id",
  checkAuth(Roles.ADMIN, Roles.SUPER_ADMIN),
  AdminController.getAdminById,
);
router.patch(
  "/:id",
  checkAuth(Roles.SUPER_ADMIN),
  validateRequest(updateAdminZodSchema),
  AdminController.updateAdmin,
);
router.delete(
  "/:id",
  checkAuth(Roles.SUPER_ADMIN),
  AdminController.deleteAdmin,
);

router.patch(
  "/change-user-status/:id",
  checkAuth(Roles.SUPER_ADMIN, Roles.ADMIN),
  AdminController.changeUserStatus,
);
router.patch(
  "/change-user-role/:id",
  checkAuth(Roles.SUPER_ADMIN),
  AdminController.changeUserRole,
);

export const AdminRoutes = router;
