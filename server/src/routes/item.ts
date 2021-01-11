import { Router } from 'express';
import {
  addTarget,
  checkItem,
  deleteItem,
  postItemLink,
  updateItemPrices,
} from '../controllers/itemControllers';
const router = Router();

router.post('/', postItemLink);
router.delete('/', deleteItem);
router.get('/', checkItem);
router.post('/update', updateItemPrices);
router.post('/target', addTarget);
export { router as itemRouter };
