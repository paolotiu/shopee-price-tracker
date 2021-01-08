import { Router } from "express";
import { postItemLink } from "../controllers/itemControllers";
const router = Router();

router.get("/check", postItemLink);

export { router as itemRouter };
