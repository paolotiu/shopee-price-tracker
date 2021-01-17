import { Router } from 'express';
import {
  loginUser,
  resendConfirmationEmail,
  signUpUser,
  confirmEmail,
  googleAuth,
  googleCallback,
  googleSuccess,
} from '../controllers/authControllers';
const router = Router();

router.post('/sign-up', signUpUser);
router.post('/login', loginUser);
router.get('/logout', (req, res, next) => {
  res.clearCookie('spt-jar');
  req.session.destroy((err) => {
    if (err) return next(err);
    return res.json({ message: 'Successfully logged out' });
  });
});
router.post('/resendEmail', resendConfirmationEmail);
router.get('/confirmation/:token', confirmEmail);

// Google Routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/google/success', googleSuccess);

export { router as authRouter };
