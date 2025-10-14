import {Request, Response, NextFunction} from "express";
import multer from "multer";

interface ErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export function errorConverter(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  let success = false;
  let statusCode = 500;
  let message = "Internal Server Error";

  if (!(err instanceof AppError)) {
    if (err instanceof multer.MulterError) {
      if (err?.code === "LIMIT_FILE_SIZE") {
        message = "File size too large. Maximum allowed size is 5MB.";
        statusCode = 400;
      } else {
        message = "File upload error.";
        statusCode = 400;
      }
      err = new AppError(message, statusCode, success);
    }
  } else {
    success = err.success;
    statusCode = err.statusCode;
    message = err.message;
  }
  const errorResponse: ErrorResponse = {
    success,
    statusCode,
    message,
  };
  return res.status(statusCode).json(errorResponse);
}

export class AppError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string, statusCode: number, success = false) {
    super(message);
    this.success = success;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
