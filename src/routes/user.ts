import { loginUser, signUpUser } from "./../controllers/userController";
import { Router } from "express";
const router = Router();

router.post("/sign-up", signUpUser);
router.post("/login", loginUser);
export { router as userRouter };
