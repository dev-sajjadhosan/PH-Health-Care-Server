import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { IRequestUser } from "../admin/admin.interface";
import { PatientService } from "./patient.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

import { IQueryParams } from "../../interfaces/query.interface";

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await PatientService.getAllPatient(query as IQueryParams);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Patients fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const payload = req.body;

  const result = await PatientService.updateMyProfile(user, payload);
  sendResponse(res, {
    httpStatusCode: status.OK,
    message: "Profile updated successfully",
    success: true,
    data: result,
  });
});

export const PatientController = {
  getAllPatient,
  updateProfile,
};
