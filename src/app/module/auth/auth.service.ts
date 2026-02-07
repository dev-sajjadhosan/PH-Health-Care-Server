import { string } from "better-auth";
import { Roles, User, UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { Request } from "express";

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      //   role: Roles.PATIENT,
    },
  });

  if (!data.user) {
    throw new Error("Failed to register patient");
  }

  //TODO : Create Patient profile in transaction after signup of patient in user model
  const patient = await prisma.$transaction(async (tx) => {
    try {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
      return patientTx;
    } catch (err) {
      console.log("Transaction error: ", err);
      await prisma.user.delete({
        where: {
          id: data.user.id,
        },
      });
      throw err;
    }
  });

  return { ...data, patient };
};

const loginPatient = async (payload: IRegisterPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is blocked");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new Error("User is deleted");
  }

  return data;
};

const logoutPatient = async (req: Request) => {
  const data = await auth.api.signOut();
  return data;
};

export const AuthService = { registerPatient, loginPatient, logoutPatient };
