import express from 'express';
import {
  currentUser,
  signIn,
  signOut,
  signUp,
} from '../controllers/authController';
import { body } from 'express-validator';

const router = express.Router();

// @route   GET api/users/currentuser
// @desc    Get the current user
// @access  Private
router.get('/currentuser', currentUser);

// @route   GET api/users/signin
// @desc    User sign in
// @access  Public
router.post('/signin', signIn);

// @route   GET api/users/signout
// @desc    User sign out
// @access  Private
router.post('/signout', signOut);

// @route   GET api/users/signup
// @desc    User sign up
// @access  Public
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password should be at least 4 password'),
  ],
  signUp
);

export { router as authRouter };
