import React from "react";
import LoginForm from "../Form/LoginForm";
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { saveAuthInfo } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

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
        onClose();
        toast.success("로그인되었습니다.");
      }
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </Modal>
  );
};

export default LoginModal;
