import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.registerPatient(payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Patient register successfully.",
    data: result,
  });
});

const loginPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthService.loginPatient(payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User login successfully.",
    data: result,
  });
});
const logoutPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.logoutPatient(req);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User logout successfully.",
    data: result,
  });
});

export const AuthController = { registerPatient, loginPatient, logoutPatient };
