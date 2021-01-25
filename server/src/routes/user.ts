import { checkItems, checkOneItem, getUser } from './../controllers/userController';
import { Router } from 'express';
const router = Router();

router.get('/items', checkItems);
router.get('/', getUser);
router.get('/item/:id', checkOneItem);
export { router as userRouter };
