import { Prisma } from "../../../generated/prisma/client";

export const patientSearchableFields = [
  "name",
  "email",
  "address",
  "contactNumber",
];

export const patientFilterableFields = [
  "email",
  "contactNumber",
  "isDeleted",
  "user.role",
];

export const patientIncludeConfig: Partial<
  Record<
    keyof Prisma.PatientInclude,
    Prisma.PatientInclude[keyof Prisma.PatientInclude]
  >
> = {
  user: true,
  patientHealthData: true,
  medicalReports: true,
  appointments: {
    include: {
      patient: true,
      doctor: true,
      prescription: true,
    },
  },
  reviews: true,
  prescriptions: true,
};