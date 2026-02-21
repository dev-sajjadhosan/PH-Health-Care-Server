import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { IRequestUser } from "../admin/admin.interface";
import { PatientService } from "./patient.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

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
  updateProfile
};
