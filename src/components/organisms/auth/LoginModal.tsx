import React from "react";
import { useForm } from "react-hook-form";
import { LoginData, LoginResponse } from "../../../types/api/user";
import { useMutation } from "@tanstack/react-query";
import { sendLoginRequest } from "../../../api/authentication/authApi";
import { useAuth } from "../../../hooks/useAuth";
import { loginErrorMessages } from "../../../constants/errorMessages";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import Modal from "../../molecules/modal/Modal";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";
import Button from "../../atoms/buttons/Button";
import SubTitle from "../../atoms/titles/subtitle/SubTitle";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

type EmailOnlyData = Pick<LoginData, "email">;

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { saveAuthInfo } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailOnlyData>();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<ApiErrorResponse>,
    LoginData
  >({
    mutationFn: sendLoginRequest,
    onSuccess: (response: LoginResponse) => {
      const token = response.data?.accessToken;
      if (token) {
        saveAuthInfo(token);
        onLoginSuccess();
        onClose();
        toast.success("로그인되었습니다.");
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          setError("email", {
            type: "manual",
            message: loginErrorMessages.validation.emailInvalid,
          });
        } else {
          toast.error(loginErrorMessages.generic);
        }
      }
    },
  });

  const onSubmit = (data: EmailOnlyData) => {
    if (!data.email.trim()) {
      setError("email", {
        type: "manual",
        message: "이름을 입력해주세요",
      });
      return;
    }

    const loginData: LoginData = {
      email: `${data.email.trim()}@jungle.com`,
      password: "123456",
    };

    mutation.mutate(loginData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-auto w-full sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[35rem] xl:max-w-[40rem] px-4">
        <SubTitle className="text-center">로그인</SubTitle>
        <div className="login-form-container mt-5">
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <LabeledInput
              {...register("email")}
              placeholder="이름을 입력해주세요"
              label="이름"
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
            <br />
            <Button type="submit">로그인</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
