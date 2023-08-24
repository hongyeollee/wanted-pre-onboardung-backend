import appDataSource from "./index.js";

export const checkExistUserByEmail = async (email) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        id
      FROM
        users
      WHERE
        email=?
    ) AS emailRegisted`,
    [email]
  );
  return !!parseInt(result.emailRegisted);
};

export const createUser = async (email, password, name) => {
  const result = await appDataSource.query(
    `
    INSERT INTO users(
      email,
      password,
      name) VALUES(
        ?,?,?
      )
    `,
    [email, password, name]
  );
  return result;
};

export const getPasswordByEmail = async (email) => {
  const [result] = await appDataSource.query(
    `
    SELECT
      password
    FROM
      users
    WHERE
      email=?
    `,
    [email]
  );
  return result.password;
};
export const getUserIdByEmail = async (email) => {
  const [result] = await appDataSource.query(
    `
    SELECT
     id
    FROM
      users
    WHERE
      email=?
    `,
    [email]
  );
  return result.id;
};
