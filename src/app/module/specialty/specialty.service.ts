import { Specialty } from "../../generated/prisma/client";
import { SpecialtyWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const Specialty = await prisma.specialty.create({ data: payload });

  return Specialty;
};

const getAllSpecialty = async ({ params }: { params: any }) => {
  const {} = params
  const condition: SpecialtyWhereInput[] = [];

  const result = await prisma.specialty.findMany();

  return result;
};

const deleteSpecialty = async ({ params }: { params: any }) => {
  const { id } = params;
  const result = await prisma.specialty.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};
