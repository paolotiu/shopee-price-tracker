import { checkItems } from './../controllers/userController';
import { Router } from 'express';
const router = Router();

router.get('/items', checkItems);
export { router as userRouter };
