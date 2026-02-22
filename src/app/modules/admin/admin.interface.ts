import { Roles, UserStatus } from "../../../generated/prisma/enums";

export interface IUpdateAdminPayload {
    admin?: {
        name?: string;
        profilePhoto?: string;
        contactNumber?: string;
    }
}

export interface IRequestUser {
    userId: string;
    role: Roles;
    name: string;
    email: string;
    status: UserStatus;
    isDeleted: boolean;
    emailVerified: boolean;
}


export interface IChangeUserStatusPayload {
    userId: string
    userStatus: UserStatus
}

export interface IChangeUserRolePayload {
    userId: string
    role: Roles
}