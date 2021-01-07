import { signUpUser } from "./../controllers/userController";
import app from "../app";
import { Router } from "express";
const router = Router();

router.post("/sign-up", signUpUser);

export { router as userRouter };
