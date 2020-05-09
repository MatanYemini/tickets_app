import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const currentUser = () => {
  console.log('current user');
};

export const signIn = () => {
  console.log('signIn user');
};

export const signUp = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  throw new DatabaseConnectionError();
  const { email, password } = req.body;
  res.send({});
};

export const signOut = () => {
  console.log('signOut user');
};
