import express from "express";
const router = express.Router();

import * as postController from "../controllers/postController.js";
import checkValidationToken from "../middlsware/auth.js";

router.post("/", checkValidationToken, postController.createPost);
router.get("/", postController.getPosts);
router.get("/:postId", postController.getPost);
router.patch("/:postId", checkValidationToken, postController.updatePost);
router.delete("/:postId", checkValidationToken, postController.deletePost);

export default router;
