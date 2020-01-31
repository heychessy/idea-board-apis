import { NextFunction, Request, Response, Router } from "express";
import { logger } from "../config/winston";

export class ErrorController {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setRoutes();
  }
  public setRoutes() {
    this.router
      .route("*")
      .get((req: Request, res: Response, next: NextFunction) => {
        next(
          new ErrorHandler(
            404,
            `${req.ip} tried to reach ${req.originalUrl}. Oops! did you search on Google?`
          )
        );
      });
  }
  public errorHandler(
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!err.statusCode) err.statusCode = 500;
    logger.error(
      `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    res.status(err.statusCode).json({
      status: false,
      statusCode: err.statusCode,
      message: err.message
    });
  }
}

export class ErrorHandler extends Error {
  public statusCode: number;
  public message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
