import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getAllDoctors();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctors data fetched successfully!",
    data: result,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const params = req.params;

  const result = await DoctorService.getDoctorById({ params });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor fatched successfully!",
    data: result,
  });
});
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const params = req.params;
  const payload = req.body;

  const result = await DoctorService.updateDoctor({ params, payload });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor update successfully!",
    data: result,
  });
});
const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const params = req.params;

  const result = await DoctorService.deleteDoctor({ params });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor deleted successfully!",
    data: result,
  });
});

export const DoctorController = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
