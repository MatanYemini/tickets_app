import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';

export const currentUser = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const exisitngUser = await User.findOne({ email });
    if (!exisitngUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await Password.compare(
      exisitngUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    // generate JWT
    const userJwt = jwt.sign(
      {
        id: exisitngUser.id,
        email: exisitngUser.email,
      },
      process.env.JWT_KEY! // says dont worry this is defined
    );

    // save it on a session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(exisitngUser);
  } catch (error) {
    next(error);
  }
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

export const signOut = (req: Request, res: Response) => {
  req.session = null;

  res.send({});
};
