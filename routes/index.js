import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
