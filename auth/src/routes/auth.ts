import express from 'express';

const router = express.Router();

// @route   GET api/users/currentuser
// @desc    Get the current user
// @access  Public
router.get('/currentuser', (req, res) => {
  res.send('Hi There');
});

export default router;
