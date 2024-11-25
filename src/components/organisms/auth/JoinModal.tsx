import React from "react";
import { useForm } from "react-hook-form";
import {
  LoginData,
  RegisterResponse,
  LoginResponse,
} from "../../../types/api/user";
import { useMutation } from "@tanstack/react-query";
import {
  sendRegisterRequest,
  sendLoginRequest,
} from "../../../api/authentication/authApi";
import { useAuth } from "../../../hooks/useAuth";
import { registerErrorMessages } from "../../../constants/errorMessages";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import Modal from "../../molecules/modal/Modal";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";
import Button from "../../atoms/buttons/Button";
import SubTitle from "../../atoms/titles/subtitle/SubTitle";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onJoinSuccess: () => void;
}

type EmailOnlyData = Pick<LoginData, "email">;

const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  // onJoinSuccess,
}) => {
  const { saveAuthInfo } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EmailOnlyData>();

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ApiErrorResponse>,
    LoginData
  >({
    mutationFn: sendRegisterRequest,
    onSuccess: async () => {
      const loginData = {
        email: watch("email") + "@jungle.com",
        password: "123456",
      };

      try {
        const loginResponse: LoginResponse = await sendLoginRequest(loginData);
        console.log(loginResponse.data);
        const loginToken = loginResponse.data?.accessToken;
        if (loginToken) {
          saveAuthInfo(loginToken);
          // onJoinSuccess();
        }
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        toast.error("자동 로그인에 실패했습니다. 로그인해주세요.");
      }
      onClose();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          setError("email", {
            type: "manual",
            message: registerErrorMessages.validation.emailInvalid,
          });
        } else {
          toast.error(registerErrorMessages.generic);
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

    const joinData: LoginData = {
      email: `${data.email.trim()}@jungle.com`,
      password: "123456",
      role: "user",
    };
    // localStorage.setItem("name", data.email);
    mutation.mutate(joinData);
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

export default JoinModal;
