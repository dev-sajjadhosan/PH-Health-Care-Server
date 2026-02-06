import { Specialty } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const Specialty = await prisma.specialty.create({ data: payload });

  return Specialty;
};

export const SpecialtyService = { createSpecialty };
