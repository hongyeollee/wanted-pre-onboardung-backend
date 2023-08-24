import appDataSource from "./index.js";

export const createPost = async (title, description, userId) => {
  return await appDataSource.query(
    `
    INSERT INTO posts(
      user_id,
      title,
      description
    ) VALUES(
      ?,?,?
    )
    `,
    [userId, title, description]
  );
};

export const getPosts = async (page, perPage) => {
  const offset = (page - 1) * perPage;
  const result = await appDataSource.query(
    `
    SELECT
      *
    FROM
      posts
    ORDER BY
      id DESC
    LIMIT ?
    OFFSET ?
    `,
    [page, offset]
  );
  return result;
};

export const getPost = async (postId) => {
  const [result] = await appDataSource.query(
    `
    SELECT
      *
    FROM
      posts
    WHERE
      id=?
    `,
    [postId]
  );
  return result;
};

export const checkExistPost = async (postId) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        id
      FROM
        posts
      WHERE
        id=?
    )AS postRegisted
    `,
    [postId]
  );
  return !!parseInt(result.postRegisted);
};

export const deletePost = async (postId) => {
  const result = await appDataSource.query(
    `
    DELETE
    FROM
      posts
    WHERE
      id=?
    `,
    [postId]
  );
  return result;
};

export const updatePost = async (postId, title, description) => {
  const [savedPostInfo] = await getPostById(postId);
  const updateTitle = title || savedPostInfo.title;
  const updateDescription = description || savedPostInfo.description;
  const result = await appDataSource.query(
    `
    UPDATE
      posts
    SET
      title=?,
      description=?
    WHERE
      id=?
    `,
    [updateTitle, updateDescription, postId]
  );
  return result;
};

const getPostById = async (postId) => {
  return await appDataSource.query(
    `
    SELECT
      title,description
    FROM
      posts
    WHERE
      id=?
    `,
    [postId]
  );
};
