import * as postService from "../services/postService.js";
import { catchAsync } from "../utils/error.js";

export const createPost = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user;

  if (!title || !description) {
    const error = new Error("제목, 내용을 입력해주세요.");
    error.statusCode = 400;
    throw error;
  }

  await postService.createPost(title, description, userId);
  res.status(200).json({ message: "게시글이 등록되었습니다." });
});

export const getPosts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const data = await postService.getPosts(page, perPage);

  res.status(200).json({ data });
});

export const getPost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const data = await postService.getPost(postId);
  res.status(200).json({ data });
});

export const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  await postService.deletePost(postId);
  res.status(200).json({ message: "게시글이 삭제되었습니다." });
});

export const updatePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { title, description } = req.body;

  const data = await postService.updatePost(postId, title, description);
  res.status(200).json({ message: "게시글이 수정되었습니다." });
});
