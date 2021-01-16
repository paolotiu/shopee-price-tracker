import {
  checkItems,
  loginUser,
  resendConfirmationEmail,
  signUpUser,
} from './../controllers/userController';
import { Router } from 'express';
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
router.get('/items', checkItems);
router.post('/resendEmail', resendConfirmationEmail);
export { router as userRouter };
