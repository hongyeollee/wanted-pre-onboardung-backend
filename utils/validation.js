export const checkValidationEmail = async (email) => {
  const EMAIL_REGEX = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*/
  );
  if (!EMAIL_REGEX.test(email)) {
    const err = new Error(
      "유효하지 않은 이메일 형식입니다. @ 를 포함시켜주세요."
    );
    err.statusCode = 400;
    throw err;
  }
};

export const checkValidationPassword = async (password) => {
  const PASSWORD_REGEX = new RegExp(/^.{8,}$/);
  if (!PASSWORD_REGEX.test(password)) {
    const err = new Error(
      "유효하지 않은 비밀번호 형식입니다. 비밀번호는 8자 이상 입니다."
    );
    err.statusCode = 400;
    throw err;
  }
};
