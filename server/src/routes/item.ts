import { Router } from 'express';
import {
  addTarget,
  checkItem,
  postItemLink,
  updateItemPrices,
} from '../controllers/itemControllers';
const router = Router();

router.post('/', postItemLink);
router.get('/', checkItem);
router.post('/update', updateItemPrices);
router.post('/target', addTarget);
export { router as itemRouter };
