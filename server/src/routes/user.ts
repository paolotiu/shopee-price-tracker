import { checkItems, checkOneItem, deleteItem, getUser } from './../controllers/userController';
import { Router } from 'express';
const router = Router();

router.get('/items', checkItems);
router.get('/', getUser);
router.get('/item/:id', checkOneItem);
router.delete('/item', deleteItem);
export { router as userRouter };
