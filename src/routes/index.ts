import express from "express";
import { itemRouter } from "./item";
import { userRouter } from "./user";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello World");
});

router.post("/item", itemRouter);
router.use("/user", userRouter);

export default router;
