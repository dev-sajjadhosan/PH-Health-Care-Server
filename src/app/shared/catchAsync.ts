import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to do action on specialty.",
        error:
          err instanceof Error
            ? err.message
            : "Unknown Error of specialty action.",
      });
    }
  };
};