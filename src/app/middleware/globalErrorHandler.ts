import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";
import AppError from "../errorHelpers/AppError";
import { deleteFileFromCloudinary } from "../config/cloudinary.config";
import { deleteUploadFileFromGlobalErrorHandler } from "../utils/deleteUploadFileFromGlobalErrorHandler";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from error-handler: ", err);
  }

  // if (req.file) {
  //   await deleteFileFromCloudinary(req.file.path);
  // }
  // if (req.files && Array.isArray(req.files) && req.files.length > 0) {
  //   const imageUrls = req.files.map((file) => file.path);

  //   await Promise.all(imageUrls.map((url) => deleteFileFromCloudinary(url)));
  // }
  await deleteUploadFileFromGlobalErrorHandler(req);

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let stack: string | undefined = undefined;

  if (err instanceof z.ZodError) {
    const zError = handleZodError(err);
    statusCode = zError.statusCode;
    message: zError.message;
    errorSources.push(...zError.errorSources);
    stack = err.stack;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    //?  Native error class should be alawys on the end or bottom.
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message: err.name || message,
    error: envVars.NODE_ENV === "development" ? err : undefined,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
    errorSources,
    details: envVars.NODE_ENV === "development" ? err : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
