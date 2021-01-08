import {
  checkItems,
  loginUser,
  signUpUser,
} from "./../controllers/userController";
import { Router } from "express";
const router = Router();

router.post("/sign-up", signUpUser);
router.post("/login", loginUser);
router.get("/items", checkItems);
export { router as userRouter };
