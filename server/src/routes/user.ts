import { checkItems, getUser } from './../controllers/userController';
import { Router } from 'express';
const router = Router();

router.get('/items', checkItems);
router.get('/', getUser);
export { router as userRouter };
