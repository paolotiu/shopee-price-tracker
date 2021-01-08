import { Router } from "express";
import { deleteItem, postItemLink } from "../controllers/itemControllers";
const router = Router();

router.post("/", postItemLink);
router.delete("/", deleteItem);
export { router as itemRouter };
