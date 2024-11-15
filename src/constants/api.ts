export const baseURL = "https://socketing.hjyoon.me/api/";

export const registerErrorMessages = {
  validation: {
    emailInvalid: "이메일 형식이 올바르지 않습니다.",
    passwordInvalid: "비밀번호는 6글자 이상이어야 합니다.",
  },
  duplicateUser: "이미 가입된 사용자입니다.",
  generic: "회원가입에 실패하였습니다.",
};

export const loginErrorMessages = {
  validation: {
    emailInvalid: "이메일을 입력해주세요.",
    passwordInvalid: "비밀번호를 입력해주세요.",
  },
  noMatch: "아이디 또는 비밀번호가 잘못되었습니다.",
  generic: "로그인에 실패하였습니다.",
};
