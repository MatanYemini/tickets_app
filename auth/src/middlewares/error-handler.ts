import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else if (err instanceof DatabaseConnectionError) {
    res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  } else {
    res.status(400).send({
      errors: [{ message: 'Something Went Wrong!' }],
    });
  }
};
