import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";



const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.createSpecialty(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty created successfully.",
    data: result,
  });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
  const params = req.query;
  const result = await SpecialtyService.getAllSpecialty({ params });

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialty fetched successfully.",
    data: result,
  });
});

const deleteSpecialty = async (req: Request, res: Response) =>
  catchAsync(async (req: Request, res: Response) => {
    const params = req.params;
    const result = await SpecialtyService.deleteSpecialty({ params });

    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Specialty deleted successfully.",
      data: result,
    });
  });

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};
