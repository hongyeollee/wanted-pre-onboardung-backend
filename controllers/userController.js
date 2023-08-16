import { catchAsync } from "../utils/error.js";
import * as userService from "../services/userService.js";

export const signup = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    const error = new Error(
      "이메일, 비밀번호, 이름의 정보가 입력되지 않았습니다."
    );
    error.statusCode = 400;
    throw error;
  }
  await userService.signup(email, password, name);
  return res.status(201).json({ message: "회원가입 완료" });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("이메일, 비밀번호를 입력하세요");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.login(email, password);

  res.status(200).json({ accessToken });
});
