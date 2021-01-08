import { Router } from "express";
import {
  checkItem,
  deleteItem,
  postItemLink,
} from "../controllers/itemControllers";
const router = Router();

router.post("/", postItemLink);
router.delete("/", deleteItem);
router.get("/", checkItem);
export { router as itemRouter };
