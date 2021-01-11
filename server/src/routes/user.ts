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
router.get('/items', checkItems);
router.post('/resendEmail', resendConfirmationEmail);
export { router as userRouter };
