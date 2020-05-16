import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('as');
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
