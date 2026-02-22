import status from "http-status";
import { Roles, UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";

import { prisma } from "../../lib/prisma";
import {
  IChangeUserRolePayload,
  IChangeUserStatusPayload,
  IRequestUser,
  IUpdateAdminPayload,
} from "./admin.interface";

const getAllAdmins = async () => {
  const admins = await prisma.admin.findMany({
    include: {
      user: true,
    },
  });
  return admins;
};

const getAdminById = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return admin;
};

const updateAdmin = async (id: string, payload: IUpdateAdminPayload) => {
  //TODO: Validate who is updating the admin user. Only super admin can update admin user and only super admin can update super admin user but admin user cannot update super admin user

  const isAdminExist = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isAdminExist) {
    throw new AppError(status.NOT_FOUND, "Admin Or Super Admin not found");
  }

  const { admin } = payload;

  const updatedAdmin = await prisma.admin.update({
    where: {
      id,
    },
    data: {
      ...admin,
    },
  });

  return updatedAdmin;
};

//soft delete admin user by setting isDeleted to true and also delete the user session and account
const deleteAdmin = async (id: string, user: IRequestUser) => {
  //TODO: Validate who is deleting the admin user. Only super admin can delete admin user and only super admin can delete super admin user but admin user cannot delete super admin user

  const isAdminExist = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isAdminExist) {
    throw new AppError(status.NOT_FOUND, "Admin Or Super Admin not found");
  }

  if (isAdminExist.id === user.userId) {
    throw new AppError(status.BAD_REQUEST, "You cannot delete yourself");
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.admin.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    await tx.user.update({
      where: { id: isAdminExist.userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: UserStatus.DELETED, // Optional: you may also want to block the user
      },
    });

    await tx.session.deleteMany({
      where: { userId: isAdminExist.userId },
    });

    await tx.account.deleteMany({
      where: { userId: isAdminExist.userId },
    });

    const admin = await getAdminById(id);

    return admin;
  });

  return result;
};

const changeUserStatus = async (
  user: IRequestUser,
  payload: IChangeUserStatusPayload,
) => {
  //1. Super admin can change the status of any user (admin, doctor, patient). Except himself. He cannot chnage his own status.

  //2. Admin can change the status of doctor and patient. Except himself. He cannot change his own status. He cannot change the status of super admin and other admin user

  const isAdminExist = await prisma.admin.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include: {
      user: true,
    },
  });
  const { userId, userStatus } = payload;

  const userToChangeStatus = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const selfStatusChange = isAdminExist.userId === userId;
  if (selfStatusChange) {
    throw new AppError(
      status.BAD_REQUEST,
      "You cannot chnage your own status.",
    );
  }

  if (
    isAdminExist.user.role === Roles.ADMIN &&
    userToChangeStatus.role === Roles.SUPER_ADMIN
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "You cannot chnage the status of super admin. Only super admin can change the status of another super admin.",
    );
  }

  if (
    isAdminExist.user.role === Roles.ADMIN &&
    userToChangeStatus.role === Roles.ADMIN
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "You cannot change the status of another admin. Only super admin can change the status of another admin.",
    );
  }

  if (userStatus === UserStatus.DELETED) {
    throw new AppError(
      status.BAD_REQUEST,
      "You cannot set user status to deleted. To delete a user, you have to use role specific delete api. For example, to delete an doctor user, you have to use delete doctor api which will set the user status to deleted and also set isDeleted to true and also delete the user session and account.",
    );
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: userStatus,
    },
  });

  return updateUser;
};
const changeUserRole = async (
  user: IRequestUser,
  payload: IChangeUserRolePayload,
) => {
  // 1. Super admin can chnage the role of only other super admin and admin user. He cannot change hos own role
  // 2. admin cannot chnange role of any user
  // 3. Role of patient and doctor user cannot be change by anyone. If needed, they have to be deleted and recreated with new role.

  const isSuperAdminExist = await prisma.admin.findUniqueOrThrow({
    where: {
      email: user.email,
      user: {
        role: Roles.SUPER_ADMIN,
      },
    },
    include: {
      user: true,
    },
  });

  const { role, userId } = payload;

  const userToChangeStatus = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const selfRoleChange = isSuperAdminExist.userId === userId; // check if the super-admin want to change his own Role.

  if (selfRoleChange) {
    throw new AppError(status.BAD_REQUEST, "You cannot change your own role");
  }

  if (
    userToChangeStatus.role === Roles.DOCTOR ||
    userToChangeStatus.role === Roles.PATIENT
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "You cannot change the role of doctor and patient user. If you want to change the role of the doctor or patient user, you have to delete the user and recreate with new role.",
    );
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });

  return updateUser;
};

export const AdminService = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changeUserStatus,
  changeUserRole,
};
