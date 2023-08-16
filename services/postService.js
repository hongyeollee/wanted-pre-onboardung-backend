import * as postDao from "../models/postDao.js";

export const createPost = async (title, description, userId) => {
  return await postDao.createPost(title, description, userId);
};

export const getPosts = async (page, perPage) => {
  return await postDao.getPosts(page, perPage);
};

export const getPost = async (postId) => {
  await checkExistPost(postId);
  const result = await postDao.getPost(postId);
  return result;
};

export const deletePost = async (postId) => {
  await checkExistPost(postId);
  await postDao.deletePost(postId);
};

export const updatePost = async (postId, title, description) => {
  await checkExistPost(postId);
  return await postDao.updatePost(postId, title, description);
};

export const checkExistPost = async (postId) => {
  const checkExistPost = await postDao.checkExistPost(postId);
  if (!checkExistPost) {
    const error = new Error("존재하지 않는 게시글입니다.");
    error.statusCode = 400;
    throw error;
  }
};
