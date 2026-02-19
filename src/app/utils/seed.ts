import { Roles } from "../../generated/prisma/enums";
import { envVars } from "../config/env";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: { role: Roles.SUPER_ADMIN },
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exist. Skipping seeding Super-Admin.");
      return;
    }

    const superAdminUser = await auth.api.signUpEmail({
      body: {
        email: envVars.SUPER_ADMIN_GMAIL,
        password: envVars.SUPER_ADMIN_PASSWORD,
        name: "Super Admin",
        role: Roles.SUPER_ADMIN,
        needPasswordChange: false,
        rememberMe: false,
      },
    });

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: superAdminUser.user.id,
        },
        data: {
          emailVerified: true,
        },
      });

      await tx.admin.create({
        data: {
          userId: superAdminUser.user.id,
          name: "Super Admin",
          email: envVars.SUPER_ADMIN_GMAIL,
        },
      });
    });
    const superAdmin = await prisma.admin.findFirst({
      where: {
        email: envVars.SUPER_ADMIN_GMAIL,
      },
      include: {
        user: true,
      },
    });

    console.log(`Super Admin created:`, superAdmin);
  } catch (error: any) {
    console.error(`Error seeding super admin: `, error);
    await prisma.user.delete({
      where: {
        email: envVars.SUPER_ADMIN_GMAIL,
      },
    });
  }
};
