import express from 'express';
import {
  currentUser,
  trying,
  signIn,
  signOut,
  signUp,
} from '../controllers/authController';
import { body } from 'express-validator';
import { NotFoundError } from '../errors/not-found-error';
import { validateRequest } from '../middlewares/validate-request';
import { defineCurrentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

// @route   GET api/users/signout
// @desc    User sign out
// @access  Private
router.post('/signout', signOut);

router.post('/try', trying);

// @route   GET api/users/currentuser
// @desc    Get the current user
// @access  Private
router.get('/currentuser', defineCurrentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

// @route   GET api/users/signin
// @desc    User sign in
// @access  Public
router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  signIn
);

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
  validateRequest,
  signUp
);

// Add combined router
router.all('*', () => {
  throw new NotFoundError();
});

export { router as authRouter };
