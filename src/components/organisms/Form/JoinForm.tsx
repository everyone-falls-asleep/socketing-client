import SubTitle from "../../atoms/titles/subtitle/SubTitle";
import Container from "../../layout/Container";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";
import Button from "../../atoms/buttons/Button";

import { sendRegisterRequest } from "../../../api/authentication/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoginData, RegisterResponse } from "../../../types/api/user";
import { JoinConfirmData } from "../../../types/form/user";
import { ApiErrorResponse } from "../../../types/api/common";
import { AxiosError } from "axios";
import { registerErrorMessages } from "../../../constants/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<JoinConfirmData>();

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ApiErrorResponse>,
    LoginData,
    unknown
  >({
    mutationFn: sendRegisterRequest,

    onSuccess: (response: RegisterResponse) => {
      toast.success(`환영합니다, ${response.data?.nickname}님 !`);
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          const field = error.response.data.details?.[0].field;
          const message =
            field === "email"
              ? registerErrorMessages.validation.emailInvalid
              : registerErrorMessages.validation.passwordInvalid;

          if (field) {
            setError(field as keyof LoginData, { type: "manual", message });
          }
        } else if (code === 1) {
          setError("email", {
            type: "manual",
            message: registerErrorMessages.duplicateUser,
          });
        } else {
          toast.error(registerErrorMessages.generic);
        }
      }
    },
  });

  const onSubmit = (data: JoinConfirmData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const password = watch("password");

  return (
    <div>
      <SubTitle>회원가입</SubTitle>
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
          <LabeledInput
            {...register("passwordConfirm", {
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
            placeholder="비밀번호를 확인해주세요"
            label="PASSWORD CONFIRM"
            type="password"
          />
          {errors.passwordConfirm && (
            <span style={{ color: "red" }}>
              {errors.passwordConfirm.message}
            </span>
          )}
          <br />
          <Button type="submit">회원가입</Button>
        </form>
      </Container>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default JoinForm;
