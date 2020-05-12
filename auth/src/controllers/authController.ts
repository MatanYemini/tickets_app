import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

export const currentUser = () => {
  console.log('current user');
};

export const signIn = () => {
  console.log('signIn user');
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // says dont worry this is defined
    );

    // save it on a session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

export const signOut = () => {
  console.log('signOut user');
};
