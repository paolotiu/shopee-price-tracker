import { Router } from 'express';
import {
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
export { router as itemRouter };
