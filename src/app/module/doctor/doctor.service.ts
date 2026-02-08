import { prisma } from "../../lib/prisma";
import { IParams } from "../../types/types";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctors;
};

const getDoctorById = async ({ params }: { params: IParams }) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: params?.id,
    },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });

  return doctor;
};

const updateDoctor = async ({
  params,
}: {
  params: IParams;
  payload: IUpdateDoctorPayload;
}) => {};

const deleteDoctor = async ({ params }: { params: IParams }) => {};

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
