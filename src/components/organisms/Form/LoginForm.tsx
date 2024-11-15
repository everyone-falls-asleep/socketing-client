import Subtitle from "../../atoms/titles/subtitle/SubTitle";
import Container from "../../layout/Container";
import Button from "../../atoms/buttons/Button";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";

import { sendLoginRequest } from "../../../api/authentication/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoginData, LoginResponse } from "../../../types/api/user";
import { ApiErrorResponse } from "../../../types/api/common";
import { AxiosError } from "axios";
import { loginErrorMessages } from "../../../constants/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<ApiErrorResponse>,
    LoginData,
    unknown
  >({
    mutationFn: sendLoginRequest,

    onSuccess: (response: LoginResponse) => {
      toast.success(`환영합니다 !`);
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          const field = error.response.data.details?.[0].field;
          const message =
            field === "email"
              ? loginErrorMessages.validation.emailInvalid
              : loginErrorMessages.validation.passwordInvalid;

          if (field) {
            setError(field as keyof LoginData, { type: "manual", message });
          }
        } else if (code === 2) {
          setError("password", {
            type: "manual",
            message: loginErrorMessages.noMatch,
          });
        } else {
          toast.error(loginErrorMessages.generic);
        }
      }
    },
  });

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <Subtitle>로그인</Subtitle>
      <Container width="400px">
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <LabeledInput
            {...register("email")}
            placeholder="이메일을 입력해주세요"
            label="EMAIL"
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          <br />
          <LabeledInput
            {...register("password")}
            placeholder="비밀번호를 입력해주세요"
            label="PASSWORD"
            type="password"
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
          <br />
          <Button type="submit">로그인</Button>
        </form>
      </Container>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
